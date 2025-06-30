import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const all = res.data;
    
    // 👇 Your backup missions (shown when DB is empty)
    const defaultMissions = [
      {
        _id: 'static-1',
        title: "Workout",
        description: "6:30 AM - 7:15 AM: Leg day. 3 sets of squats, lunges, calf raises.",
        createdAt: new Date().toISOString()
      },
      {
        _id: 'static-2',
        title: "Coding",
        description: "9:00 AM - 12:00 PM: Build dashboard layout, fix responsive styling.",
        createdAt: new Date().toISOString()
      },
      {
        _id: 'static-3',
        title: "Music",
        description: "2:30 PM - 3:00 PM: Learn a new ukulele song 🎵",
        createdAt: new Date().toISOString()
      },
      {
        _id: 'static-4',
        title: "Movie Night",
        description: "9:00 PM - 11:00 PM: Watch ‘Inside Out 2’ and chill 🍿",
        createdAt: new Date().toISOString()
      }
    ];

    const dataToUse = all.length === 0 ? defaultMissions : all;

    setTasks(dataToUse.map((t, i) => ({
      ...t,
      id: t._id || i.toString()
    })));

  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};


  const addTask = async (taskData) => {
    const res = await axios.post(`${process.env.REACT_APP_API}/api/tasks`, taskData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
    return res.data;
  };

  const deleteTask = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  return (
    <TaskContext.Provider value={{ selectedDate, setSelectedDate, tasks, fetchTasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
