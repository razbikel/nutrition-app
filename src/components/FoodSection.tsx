import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { FoodEntry } from '../types';

interface FoodSectionProps {
  foods: FoodEntry[];
  onAddFood: (description: string, calories: number) => void;
  onEditFood: (id: string, description: string, calories: number) => void;
  onDeleteFood: (id: string) => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({
  foods,
  onAddFood,
  onEditFood,
  onDeleteFood
}) => {
  const [newFood, setNewFood] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingCalories, setEditingCalories] = useState('');

  const handleAddFood = () => {
    const calories = parseInt(newCalories);
    if (newFood.trim() && !isNaN(calories) && calories >= 0) {
      onAddFood(newFood.trim(), calories);
      setNewFood('');
      setNewCalories('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddFood();
    }
  };

  const startEditing = (food: FoodEntry) => {
    setEditingId(food.id);
    setEditingText(food.description);
    setEditingCalories(food.calories.toString());
  };

  const saveEdit = () => {
    const calories = parseInt(editingCalories);
    if (editingId && editingText.trim() && !isNaN(calories) && calories >= 0) {
      onEditFood(editingId, editingText.trim(), calories);
      setEditingId(null);
      setEditingText('');
      setEditingCalories('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
    setEditingCalories('');
  };

  const totalFoodCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          🍽️ מזון / Food Entries
        </h3>
        {totalFoodCalories > 0 && (
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
            {totalFoodCalories} cal consumed
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newFood}
            onChange={(e) => setNewFood(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 2 slices of bread / 2 פרוסות לחם"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            dir="auto"
          />
          <input
            type="number"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Calories"
            min="0"
            className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddFood}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            הוסף / Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {foods.map((food) => (
          <div key={food.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            {editingId === food.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  dir="auto"
                  autoFocus
                />
                <input
                  type="number"
                  value={editingCalories}
                  onChange={(e) => setEditingCalories(e.target.value)}
                  min="0"
                  className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={saveEdit}
                  className="p-1 text-green-600 hover:text-green-800"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 text-gray-600 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-gray-800" dir="auto">{food.description}</span>
                <span className="text-orange-600 font-medium text-sm">
                  {food.calories} cal
                </span>
                <button
                  onClick={() => startEditing(food)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteFood(food.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ))}
        
        {foods.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            אין רישומי מזון ליום זה / No food entries for this day. Add your first meal above!
          </div>
        )}
      </div>
    </div>
  );
};