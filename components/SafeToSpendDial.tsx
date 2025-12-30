
import React from 'react';

interface SafeToSpendDialProps {
  remaining: number;
  total: number;
}

const SafeToSpendDial: React.FC<SafeToSpendDialProps> = ({ remaining, total }) => {
  const percentage = Math.max(0, Math.min(100, (remaining / total) * 100));
  const radius = 120;
  const stroke = 14;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // We want the dial to be a 3/4 circle (arc)
  const arcLength = 0.75;
  const offset = circumference - (percentage / 100) * (circumference * arcLength);
  const totalArc = circumference * arcLength;
  const strokeDashoffset = circumference - (percentage / 100) * totalArc;

  return (
    <div className="relative flex items-center justify-center p-8">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-[225deg]"
      >
        {/* Background Arc */}
        <circle
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${totalArc} ${circumference}`}
          style={{ strokeDashoffset: 0 }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Arc */}
        <circle
          stroke="#CCFF00"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${totalArc} ${circumference}`}
          style={{ 
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-out'
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="text-white/50 text-sm font-medium uppercase tracking-widest">Safe to Spend</span>
        <div className="flex items-start">
          <span className="text-white/70 text-2xl font-bold mt-2">$</span>
          <span className="text-white text-6xl font-bold tracking-tighter">
            {Math.round(remaining)}
          </span>
        </div>
        <span className="text-lime-400 text-xs font-semibold mt-1">
          OF ${Math.round(total)} TODAY
        </span>
      </div>
    </div>
  );
};

export default SafeToSpendDial;
