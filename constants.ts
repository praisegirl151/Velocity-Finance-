
import { MoneyLeak, DayRecord } from './types';

export const COLORS = {
  navy: '#0A1128',
  lime: '#CCFF00',
  glass: 'rgba(255, 255, 255, 0.05)',
  red: '#FF4D4D',
};

export const INITIAL_LEAKS: MoneyLeak[] = [
  { id: '1', name: 'Premium Subscriptions', dailyCost: 4.5, enabled: true, category: 'Sub' },
  { id: '2', name: 'Daily Coffee Run', dailyCost: 6.0, enabled: true, category: 'Food' },
  { id: '3', name: 'Commute/Ride Share', dailyCost: 12.0, enabled: true, category: 'Transport' },
  { id: '4', name: 'Lunch Deliveries', dailyCost: 18.0, enabled: true, category: 'Food' },
  { id: '5', name: 'Gym Membership', dailyCost: 2.5, enabled: true, category: 'Sub' },
];

export const INITIAL_HISTORY: DayRecord[] = Array.from({ length: 14 }).map((_, i) => ({
  date: `2024-05-${10 + i}`,
  spent: Math.floor(Math.random() * 50) + 40,
  velocity: Math.floor(Math.random() * 40) - 20,
}));

export const BASE_DAILY_BUDGET = 120;
