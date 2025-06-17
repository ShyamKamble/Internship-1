import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Collaborative Task Manager
          </h1>
          <p className="text-gray-600">
            Organize, assign, and track your team's tasks efficiently
          </p>
        </div>

        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default App;
