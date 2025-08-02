import React, { useState, useEffect } from 'react';
import { DateNavigation } from './components/DateNavigation';
import { FoodSection } from './components/FoodSection';
import { ActivitySection } from './components/ActivitySection';
import { SummarySection } from './components/SummarySection';
import { ExportSection } from './components/ExportSection';
import { DailyData, FoodEntry, ActivityEntry } from './types';
import { getDailyData, saveDailyData } from './utils/storage';
import { getTodayString } from './utils/date';

function App() {
  const [currentDate, setCurrentDate] = useState(getTodayString());
  const [dailyData, setDailyData] = useState<DailyData>({
    date: currentDate,
    foods: [],
    activities: [],
    summary: '',
  });
  const [loading, setLoading] = useState(true);

  // Load data when date changes
  useEffect(() => {
    setLoading(true);
    getDailyData(currentDate).then(data => {
      setDailyData(data);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load daily data:', err);
      setDailyData({
        date: currentDate,
        foods: [],
        activities: [],
        summary: '',
      });
      setLoading(false);
    });
  }, [currentDate]);

  // Save data whenever dailyData changes (but not on initial load)
  useEffect(() => {
    if (!loading && dailyData.date) {
      saveDailyData(currentDate, dailyData).catch(err => {
        console.error('Failed to save daily data:', err);
      });
    }
  }, [dailyData, currentDate, loading]);

  // Defensive calorie calculations
  const totalFoodCalories = dailyData?.foods?.reduce((sum, food) => sum + food.calories, 0) || 0;
  const totalBurnedCalories = dailyData?.activities?.reduce((sum, activity) => sum + activity.caloriesBurned, 0) || 0;
  const netCalories = totalFoodCalories - totalBurnedCalories;

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
  };

  const handleAddFood = (description: string, calories: number) => {
    const newFood: FoodEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      description,
      calories,
      timestamp: new Date().toISOString()
    };

    setDailyData(prev => ({
      ...prev,
      foods: [...prev.foods, newFood]
    }));
  };

  const handleEditFood = (id: string, description: string, calories: number) => {
    setDailyData(prev => ({
      ...prev,
      foods: prev.foods.map(food =>
        food.id === id ? { ...food, description, calories } : food
      )
    }));
  };

  const handleDeleteFood = (id: string) => {
    setDailyData(prev => ({
      ...prev,
      foods: prev.foods.filter(food => food.id !== id)
    }));
  };

  const handleAddActivity = (description: string, caloriesBurned: number) => {
    const newActivity: ActivityEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      description,
      caloriesBurned,
      timestamp: new Date().toISOString()
    };

    setDailyData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }));
  };

  const handleEditActivity = (id: string, description: string, caloriesBurned: number) => {
    setDailyData(prev => ({
      ...prev,
      activities: prev.activities.map(activity =>
        activity.id === id ? { ...activity, description, caloriesBurned } : activity
      )
    }));
  };

  const handleDeleteActivity = (id: string) => {
    setDailyData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id)
    }));
  };

  const handleSummaryChange = (summary: string) => {
    setDailyData(prev => ({
      ...prev,
      summary
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        טוען נתונים... / Loading data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🥗 מעקב תזונה ופעילות / Nutrition & Activity Tracker
          </h1>
          <p className="text-gray-600">
            עקוב אחר התזונה והפעילות הגופנית היומית / Track your daily nutrition and physical activities
          </p>
        </header>

        {(totalFoodCalories > 0 || totalBurnedCalories > 0) && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              ⚖️ סיכום קלוריות / Calorie Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{totalFoodCalories}</div>
                <div className="text-sm text-gray-600">נצרך / Consumed</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalBurnedCalories}</div>
                <div className="text-sm text-gray-600">נשרף / Burned</div>
              </div>
              <div className={`p-3 rounded-lg ${netCalories >= 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
                <div className={`text-2xl font-bold ${netCalories >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {netCalories >= 0 ? '+' : ''}{netCalories}
                </div>
                <div className="text-sm text-gray-600">נטו / Net</div>
              </div>
            </div>
          </div>
        )}
        <DateNavigation
          currentDate={currentDate}
          onDateChange={handleDateChange}
        />

        <FoodSection
          foods={dailyData.foods}
          onAddFood={handleAddFood}
          onEditFood={handleEditFood}
          onDeleteFood={handleDeleteFood}
        />

        <ActivitySection
          activities={dailyData.activities}
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />

        <SummarySection
          summary={dailyData.summary}
          onSummaryChange={handleSummaryChange}
        />

        <ExportSection />

        <footer className="text-center text-gray-500 text-sm mt-8">
          כל הנתונים נשמרים במאגר בענן ונגישים ממכשירים שונים / All data is stored in the cloud and accessible from multiple devices
        </footer>
      </div>
    </div>
  );
}

export default App;
