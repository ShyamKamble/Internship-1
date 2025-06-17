import React, { useEffect, useState } from 'react';
import { Filter, Calendar } from 'lucide-react';
import TaskCard from './TaskCard';
import { fetchTasks, updateTask, deleteTask } from '../services/api';

const TaskList = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ statusbar: '', assignedto: '' });
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await fetchTasks(filters);
      setTasks(res.data || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters, refreshTrigger]);

  const handleStatusChange = async (id, newStatus) => {
    await updateTask(id, { statusbar: newStatus });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const getTaskCounts = () => ({
    total: tasks.length,
    todo: tasks.filter(t => t.statusbar === 'To Do').length,
    inProgress: tasks.filter(t => t.statusbar === 'In Progress').length,
    done: tasks.filter(t => t.statusbar === 'Done').length,
  });

  const counts = getTaskCounts();

  return (
    <div>
      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Tasks" count={counts.total} color="blue" />
        <StatCard label="To Do" count={counts.todo} color="red" />
        <StatCard label="In Progress" count={counts.inProgress} color="yellow" />
        <StatCard label="Done" count={counts.done} color="green" />
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Filter className="w-5 h-5 mr-2" /> Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={filters.statusbar}
              onChange={(e) => setFilters({ ...filters, statusbar: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Assignee</label>
            <input
              type="text"
              placeholder="Enter assignee name..."
              value={filters.assignedto}
              onChange={(e) => setFilters({ ...filters, assignedto: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div>
          <p className="mt-2 text-gray-500">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No tasks found</p>
          <p className="text-gray-400">Create a new task to get started!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

const StatCard = ({ label, count, color }) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 text-center`}>
    <div className={`text-2xl font-bold text-${color}-600`}>{count}</div>
    <div className={`text-sm text-${color}-600`}>{label}</div>
  </div>
);

export default TaskList;
