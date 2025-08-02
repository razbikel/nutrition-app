import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { ActivityEntry } from '../types';

interface ActivitySectionProps {
  activities: ActivityEntry[];
  onAddActivity: (description: string, calories: number) => void;
  onEditActivity: (id: string, description: string, calories: number) => void;
  onDeleteActivity: (id: string) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  activities,
  onAddActivity,
  onEditActivity,
  onDeleteActivity
}) => {
  const [newActivity, setNewActivity] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState('');
  const [editingCalories, setEditingCalories] = useState('');

  const handleAddActivity = () => {
    const calories = parseInt(newCalories);
    if (newActivity.trim() && !isNaN(calories) && calories >= 0) {
      onAddActivity(newActivity.trim(), calories);
      setNewActivity('');
      setNewCalories('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddActivity();
    }
  };

  const startEditing = (activity: ActivityEntry) => {
    setEditingId(activity.id);
    setEditingDescription(activity.description);
    setEditingCalories(activity.caloriesBurned.toString());
  };

  const saveEdit = () => {
    const calories = parseInt(editingCalories);
    if (editingId && editingDescription.trim() && !isNaN(calories) && calories >= 0) {
      onEditActivity(editingId, editingDescription.trim(), calories);
      setEditingId(null);
      setEditingDescription('');
      setEditingCalories('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingDescription('');
    setEditingCalories('');
  };

  const totalCalories = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          🏃‍♂️ פעילות גופנית / Physical Activities
        </h3>
        {totalCalories > 0 && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {totalCalories} cal burned
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 30 min jogging / 30 דק' ריצה"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            dir="auto"
          />
          <input
            type="number"
            value={newCalories}
            onChange={(e) => setNewCalories(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Calories"
            min="0"
            className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleAddActivity}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            הוסף / Add
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            {editingId === activity.id ? (
              <>
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  dir="auto"
                  autoFocus
                />
                <input
                  type="number"
                  value={editingCalories}
                  onChange={(e) => setEditingCalories(e.target.value)}
                  min="0"
                  className="w-20 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                <span className="flex-1 text-gray-800" dir="auto">{activity.description}</span>
                <span className="text-green-600 font-medium text-sm">
                  {activity.caloriesBurned} cal
                </span>
                <button
                  onClick={() => startEditing(activity)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteActivity(activity.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            אין פעילויות רשומות ליום זה / No activities logged for this day. Add your first activity above!
          </div>
        )}
      </div>
    </div>
  );
};