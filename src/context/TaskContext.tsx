// src/context/TaskContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for tasks
interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasks: (page: number, limit: number) => void;
  createTask: (task: Task) => void;
  editTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Task Provider to wrap the app and provide tasks globally
export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const token = localStorage.getItem('token'); // Assuming you are using token-based authentication

  const fetchTasks = async (page: number, limit: number) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks?page=${page}&limit=${limit}`, {
        headers: { Authorization: token },
      });
      setTasks(res.data.data); // adjust if the response shape differs
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const createTask = async (task: Task) => {
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: token },
      });
      setTasks(prev => [...prev, res.data]); // Add new task to the state
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const editTask = async (id: string, task: Task, Swal:any) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
        headers: { Authorization: token },
      });
      setTasks(prev =>
        prev.map(t => (t._id === id ? { ...t, ...task } : t)) // Update the task in state
      );
      Swal.fire({
                    title: 'Success!',
                    text: 'Data Update successfully ',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                  });
    } catch (err) {
      console.error('Failed to edit task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    // alert('de')
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      setTasks(prev => prev.filter(task => task._id !== id)); // Remove task from state
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks, createTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use task context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
