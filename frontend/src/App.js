import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTaskPage from './pages/AddTaskPage';
import { TaskProvider } from './context/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTaskPage />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}
