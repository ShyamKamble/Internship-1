import React, { useState } from 'react';
import { Trash2, User, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return 'bg-red-100 text-red-800 border-red-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Done': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'To Do': return <AlertCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Done': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <button onClick={() => setShowDeleteConfirm(true)} className="text-red-500">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <p className="text-gray-600 mb-4">{task.Description}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="text-sm text-gray-500 flex items-center">
            <User className="w-4 h-4 mr-1" />
            {task.assignedto}
          </div>
          <div className={`flex items-center px-3 py-1 border text-sm rounded-full ${getStatusColor(task.statusbar)}`}>
            {getStatusIcon(task.statusbar)}
            <span className="ml-1">{task.statusbar}</span>
          </div>
        </div>
        <select
          value={task.statusbar}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="border px-2 py-1 rounded-md text-sm"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-2">Delete Task</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => onDelete(task._id)} className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-gray-200 px-4 py-2 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
