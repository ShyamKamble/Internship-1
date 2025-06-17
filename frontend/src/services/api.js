const BASE_URL = 'http://localhost:5000'; // or update if you deploy

// Create a new task
export const createTask = async (task) => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch tasks with optional filters
export const fetchTasks = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.statusbar) params.append('statusbar', filters.statusbar);
    if (filters.assignedto) params.append('assignedto', filters.assignedto);

    const response = await fetch(`${BASE_URL}/?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
};

// Update a task by ID
export const updateTask = async (id, updates) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
