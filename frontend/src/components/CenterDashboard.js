import React from 'react';
import './CenterDashboard.css';
import { useTaskContext } from '../context/TaskContext';

export default function CenterDashboard() {
  const { tasks } = useTaskContext();

  const formattedTasks = tasks.map((t) => {
    const [timeRange, desc] = t.description?.split(': ') || [];
    const [start, end] = timeRange?.split(' - ') || [];
    return {
      title: t.title,
      start: start?.trim() || 'N/A',
      end: end?.trim() || 'N/A',
      description: desc?.trim() || t.description
    };
  });

  return (
    <div className="center-dashboard">
      <div className="mood-header">
        <img
          src="https://i.imgur.com/LzI3M0K.png"
          alt="Avatar"
          className="avatar"
        />
        <h1 className="quote">“Today, I bloom in pink power 🌸”</h1>
      </div>

      <div className="mission-list">
        <h2>🎯 Missions for Today</h2>
        <ul>
          {formattedTasks.length === 0 ? (
            <p>No missions added yet. Click “Add a Mission” from sidebar!</p>
          ) : (
            formattedTasks.map((m, idx) => (
              <li key={idx} className="mission-card">
                <h3>{m.title}</h3>
                <p><strong>Start:</strong> {m.start} | <strong>End:</strong> {m.end}</p>
                <p>{m.description}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
