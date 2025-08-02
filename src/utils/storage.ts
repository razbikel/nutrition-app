import { DailyData, StorageData } from '../types';

const STORAGE_KEY = 'nutrition-tracker-data';

export const loadData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading data:', error);
    return {};
  }
};

export const saveData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const saveDailyData = (date: string, dayData: DailyData): void => {
  const allData = loadData();
  allData[date] = dayData;
  saveData(allData);
};

export const getDailyData = (date: string): DailyData => {
  const allData = loadData();
  return allData[date] || {
    date,
    foods: [],
    activities: [],
    summary: ''
  };
};