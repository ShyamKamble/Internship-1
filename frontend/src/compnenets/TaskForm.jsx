import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { createTask } from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [task, setTask] = useState({
    title: '',
    Description: '',
    assignedto: '',
    statusbar: 'To Do',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!task.title || !task.Description || !task.assignedto) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await createTask(task);
      setTask({ title: '', Description: '', assignedto: '', statusbar: 'To Do' });
      onTaskCreated();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Plus className="w-5 h-5 mr-2" />
        Create New Task
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            name="title"
            type="text"
            placeholder="Enter task title..."
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="Description"
            placeholder="Enter task description..."
            value={task.Description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
            <input
              name="assignedto"
              type="text"
              placeholder="Enter assignee name..."
              value={task.assignedto}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
            <select
              name="statusbar"
              value={task.statusbar}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Creating Task...' : 'Create Task'}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
