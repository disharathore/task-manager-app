import React, { useState } from 'react';
import './SidebarMenu.css';
import { useNavigate } from 'react-router-dom';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="menu-icon">🍰</div>
      <div className="menu-items">
        <p onClick={() => navigate('/add-task')}>➕ Add Task</p>
        <p>📋 View Tasks</p>
        <p>📅 Calendar</p>
        <p>⚙️ Settings</p>
        <p>🚪 Logout</p>
      </div>
    </div>
  );
}
