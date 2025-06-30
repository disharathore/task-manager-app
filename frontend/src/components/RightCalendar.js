import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RightCalendar.css';

export default function RightCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForDate = {
    '2025-06-29': [
      { title: 'Workout', time: '6:30 AM – 7:15 AM', goal: 'Leg day + HIIT' },
      { title: 'Read', time: '10:00 AM – 11:00 AM', goal: 'Finish 1 chapter of Atomic Habits' },
    ],
    '2025-06-30': [
      { title: 'Coding', time: '9:00 AM – 12:00 PM', goal: 'Integrate React calendar UI' },
    ]
  };

  const formatDate = (date) => date.toISOString().split('T')[0];
  const selectedDateKey = formatDate(selectedDate);
  const dayTasks = tasksForDate[selectedDateKey] || [];

  return (
    <div className="right-calendar">
      <h2>📅 My Mood Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="pink-calendar"
      />

      <div className="day-task-list">
        <h3>🗓️ Tasks on {selectedDate.toDateString()}</h3>
        {dayTasks.length > 0 ? (
          <ul>
            {dayTasks.map((task, i) => (
              <li key={i}>
                <strong>{task.title}</strong><br />
                <span>{task.time}</span><br />
                <em>{task.goal}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks added yet!</p>
        )}
      </div>
    </div>
  );
}
