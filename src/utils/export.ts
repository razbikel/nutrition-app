import { StorageData } from '../types';
import { loadData } from './storage';

export const exportAsJSON = async (): Promise<void> => {
  const data = await loadData();  // מחכים לנתונים
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `nutrition-tracker-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

export const exportAsCSV = async (): Promise<void> => {
  const data = await loadData();  // מחכים לנתונים
  let csvContent = 'Date,Type,Description,Calories,Summary\n';
  
  Object.values(data).forEach(dayData => {
    // Add food entries
    dayData.foods.forEach(food => {
      csvContent += `"${dayData.date}","Food","${food.description.replace(/"/g, '""')}","${food.calories}",""\n`;
    });
    
    // Add activity entries
    dayData.activities.forEach(activity => {
      csvContent += `"${dayData.date}","Activity","${activity.description.replace(/"/g, '""')}","-${activity.caloriesBurned}",""\n`;
    });
    
    // Add summary if exists
    if (dayData.summary.trim()) {
      csvContent += `"${dayData.date}","Summary","${dayData.summary.replace(/"/g, '""')}","","${dayData.summary.replace(/"/g, '""')}"\n`;
    }
  });
  
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(csvBlob);
  link.download = `nutrition-tracker-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};
