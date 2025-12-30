
export interface MoneyLeak {
  id: string;
  name: string;
  dailyCost: number;
  enabled: boolean;
  category: string;
}

export interface DayRecord {
  date: string;
  spent: number;
  velocity: number; // Positive is saving, negative is overspending
}

export type Screen = 'home' | 'habits' | 'analytics';

export interface AppState {
  currentDailyBudget: number;
  todaySpent: number;
  leaks: MoneyLeak[];
  history: DayRecord[];
}
