export interface FoodEntry {
  id: string;
  description: string;
  calories: number;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  description: string;
  caloriesBurned: number;
  timestamp: string;
}

export interface DailyData {
  date: string;
  foods: FoodEntry[];
  activities: ActivityEntry[];
  summary: string;
}

export interface StorageData {
  [date: string]: DailyData;
}