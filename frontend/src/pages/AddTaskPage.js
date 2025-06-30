import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import { useTaskContext } from '../context/TaskContext';
import './AddTaskPage.css';

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { tasks, addTask, deleteTask, fetchTasks } = useTaskContext();
  const [newTaskFormVisible, setNewTaskFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    start: '',
    end: '',
    description: ''
  });

  const handleAddTask = async () => {
    const formatted = {
      title: newTask.title,
      description: `${newTask.start} - ${newTask.end}: ${newTask.description}`
    };
    await addTask(formatted);
    setNewTask({ title: '', start: '', end: '', description: '' });
    setNewTaskFormVisible(false);
  };

  const finalizeTasks = () => {
    fetchTasks(); // to refresh order if needed
    navigate('/');
  };

  return (
    <div className="add-task-page">
      <h2>➕ Today's Missions</h2>

      <ReactSortable list={tasks} setList={() => {}}>
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
          </li>
        ))}
      </ReactSortable>

      {!newTaskFormVisible ? (
        <button className="show-form-btn" onClick={() => setNewTaskFormVisible(true)}>
          ➕ Add a Mission
        </button>
      ) : (
        <div className="new-task-form">
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Time"
            value={newTask.start}
            onChange={(e) => setNewTask({ ...newTask, start: e.target.value })}
          />
          <input
            type="text"
            placeholder="End Time"
            value={newTask.end}
            onChange={(e) => setNewTask({ ...newTask, end: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          ></textarea>
          <button onClick={handleAddTask}>➕ Save Task</button>
        </div>
      )}

      <button className="finalize-btn" onClick={finalizeTasks}>✅ Finalize & Return</button>
    </div>
  );
}
