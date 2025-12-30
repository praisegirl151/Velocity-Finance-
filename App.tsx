
import React, { useState, useMemo, useCallback } from 'react';
import { BASE_DAILY_BUDGET, INITIAL_LEAKS, INITIAL_HISTORY } from './constants';
import { MoneyLeak, Screen } from './types';
import Layout from './components/Layout';
import SafeToSpendDial from './components/SafeToSpendDial';
import { Zap, Coffee, Car, Pizza, CreditCard, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceArea } from 'recharts';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [leaks, setLeaks] = useState<MoneyLeak[]>(INITIAL_LEAKS);
  const [todaySpent, setTodaySpent] = useState(42);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [isSimulatingBigPurchase, setIsSimulatingBigPurchase] = useState(false);

  // Dynamic daily budget based on toggled leaks
  const currentDailyBudget = useMemo(() => {
    const leakSaving = leaks
      .filter(l => !l.enabled)
      .reduce((acc, curr) => acc + curr.dailyCost, 0);
    return BASE_DAILY_BUDGET + leakSaving;
  }, [leaks]);

  const remainingBudget = Math.max(0, currentDailyBudget - todaySpent);

  const toggleLeak = useCallback((id: string) => {
    setLeaks(prev => prev.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l));
  }, []);

  const simulateDay = useCallback(() => {
    const randomSpend = Math.floor(Math.random() * 40) + 10;
    setTodaySpent(prev => prev + randomSpend);
  }, []);

  const simulateBigPurchase = useCallback(() => {
    setIsSimulatingBigPurchase(true);
    setTimeout(() => setIsSimulatingBigPurchase(false), 3000);
  }, []);

  const renderHome = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SafeToSpendDial remaining={remainingBudget} total={currentDailyBudget} />
      
      <div className="w-full space-y-4 mt-8">
        <button 
          onClick={simulateBigPurchase}
          disabled={isSimulatingBigPurchase}
          className={`w-full py-5 rounded-[20px] font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            isSimulatingBigPurchase 
              ? 'bg-red-500/20 text-red-500 border border-red-500/50' 
              : 'bg-[#CCFF00] text-[#0A1128] lime-glow active:scale-95'
          }`}
        >
          <CreditCard size={20} />
          {isSimulatingBigPurchase ? 'Calculating Impact...' : 'Simulate $100 Purchase'}
        </button>

        {isSimulatingBigPurchase && (
          <div className="glass p-4 rounded-2xl border-red-500/30 border animate-in zoom-in-95">
            <p className="text-red-400 text-sm font-medium flex items-center gap-2">
              <TrendingDown size={16} />
              Warning: This spend would reduce your daily budget by $14.20 for the next 7 days.
            </p>
          </div>
        )}

        <div className="glass p-5 rounded-[24px]">
          <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Today's Activity</h3>
          <div className="space-y-4">
            <ActivityItem icon={<Coffee size={18} />} title="Starbucks" amount="- $6.50" time="09:15 AM" />
            <ActivityItem icon={<Pizza size={18} />} title="Joe's Pizza" amount="- $12.40" time="12:45 PM" />
            <ActivityItem icon={<Car size={18} />} title="Uber to Office" amount="- $23.10" time="08:30 AM" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHabits = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-8">
      <div>
        <h2 className="text-2xl font-bold">Money Leaks</h2>
        <p className="text-white/50 text-sm">Turn off triggers to increase your daily spend limit.</p>
      </div>

      <div className="space-y-3">
        {leaks.map(leak => (
          <div 
            key={leak.id} 
            className={`glass p-5 rounded-[24px] flex items-center justify-between transition-all duration-300 ${
              !leak.enabled ? 'border-lime-500/30 opacity-60' : 'border-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                !leak.enabled ? 'bg-lime-500/20 text-lime-400' : 'bg-white/5 text-white/50'
              }`}>
                {getIconForCategory(leak.category)}
              </div>
              <div>
                <h4 className="font-semibold text-sm">{leak.name}</h4>
                <p className="text-xs text-white/40">Saves ${leak.dailyCost.toFixed(2)}/day</p>
              </div>
            </div>
            <button 
              onClick={() => toggleLeak(leak.id)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                leak.enabled ? 'bg-white/10' : 'bg-[#CCFF00]'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                leak.enabled ? 'left-1 bg-white/40' : 'left-7 bg-[#0A1128]'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-5 bg-lime-500/10 rounded-[24px] border border-lime-500/20">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="text-lime-400" size={18} />
          <h3 className="font-bold text-lime-400 text-sm">Velocity Boost</h3>
        </div>
        <p className="text-white/70 text-xs leading-relaxed">
          By cutting your {leaks.filter(l => !l.enabled).length} leaks, you've unlocked an extra 
          <span className="text-lime-400 font-bold"> ${leaks.filter(l => !l.enabled).reduce((a,c)=>a+c.dailyCost,0).toFixed(2)}</span> per day.
        </p>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold">Wealth Velocity</h2>
        <p className="text-white/50 text-sm">Real-time savings vs overspending trend.</p>
      </div>

      <div className="glass h-64 w-full rounded-[24px] p-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <ReferenceArea y1={0} y2={50} fill="rgba(204, 255, 0, 0.05)" />
            <ReferenceArea y1={-50} y2={0} fill="rgba(255, 77, 77, 0.05)" />
            <XAxis dataKey="date" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ background: '#0A1128', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#CCFF00' }}
            />
            <Line 
              type="monotone" 
              dataKey="velocity" 
              stroke="#CCFF00" 
              strokeWidth={3} 
              dot={false}
              className="drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="absolute top-6 right-6 flex items-center gap-2">
           <div className="w-3 h-3 rounded-full bg-lime-400" />
           <span className="text-[10px] font-bold uppercase tracking-tighter text-lime-400">Green Zone</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Savings Velocity" value="+14.2%" trend="up" />
        <StatCard label="Burn Rate" value="$82/day" trend="down" />
      </div>

      <div className="glass p-5 rounded-[24px]">
        <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Milestone Progress</h3>
        <div className="flex items-center justify-between mb-2">
           <span className="text-sm font-bold">Emergency Fund</span>
           <span className="text-xs text-lime-400 font-bold">78%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-[#CCFF00] rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-white/40 text-[10px] mt-2 italic">On track to reach in 14 days at current velocity.</p>
      </div>
    </div>
  );

  return (
    <Layout activeScreen={activeScreen} setActiveScreen={setActiveScreen} onSimulate={simulateDay}>
      {activeScreen === 'home' && renderHome()}
      {activeScreen === 'habits' && renderHabits()}
      {activeScreen === 'analytics' && renderAnalytics()}
    </Layout>
  );
};

// Sub-components
const ActivityItem: React.FC<{ icon: React.ReactNode; title: string; amount: string; time: string }> = ({ icon, title, amount, time }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{time}</p>
      </div>
    </div>
    <span className="text-sm font-bold tracking-tight">{amount}</span>
  </div>
);

const StatCard: React.FC<{ label: string; value: string; trend: 'up' | 'down' }> = ({ label, value, trend }) => (
  <div className="glass p-4 rounded-[24px]">
    <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest block mb-1">{label}</span>
    <div className="flex items-center justify-between">
      <span className="text-lg font-bold">{value}</span>
      {trend === 'up' ? <TrendingUp size={16} className="text-lime-400" /> : <TrendingDown size={16} className="text-red-400" />}
    </div>
  </div>
);

const getIconForCategory = (cat: string) => {
  switch (cat) {
    case 'Sub': return <CreditCard size={18} />;
    case 'Food': return <Coffee size={18} />;
    case 'Transport': return <Car size={18} />;
    default: return <Zap size={18} />;
  }
};

export default App;
