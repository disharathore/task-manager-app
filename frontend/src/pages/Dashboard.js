import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import SidebarMenu from '../components/SidebarMenu';
import CenterDashboard from '../components/CenterDashboard';
import RightCalendar from '../components/RightCalendar';
    

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState({});

  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setMsg('Failed to fetch tasks');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API}/api/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setMsg('Failed to create task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setMsg('Failed to delete task');
    }
  };

  const toggleComplete = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-page">
      <SidebarMenu />

      <div className="main-content">
        <CenterDashboard />

        <div className="dashboard-wrapper">
          <div className="dashboard-header">
            <h2>Hi Disha 👋</h2>
            <p>Here’s your adorable task list for today</p>
          </div>

          <form className="task-form" onSubmit={createTask}>
            <input
              type="text"
              placeholder="Task Title 📝"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Task Description 💡"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Task ➕</button>
          </form>

          {msg && <p className="error">{msg}</p>}

          <ul className="task-grid">
            {tasks.map((task) => (
              <li key={task._id} className="task-card">
                <div
                  className={completed[task._id] ? 'task-completed' : ''}
                  onClick={() => toggleComplete(task._id)}
                >
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </div>
                <button onClick={() => deleteTask(task._id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <RightCalendar />
    </div>
  );
}
