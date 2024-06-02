import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import '../style/checkin.css';

const Checkin = ({dispatchDisplay}) => {
  const [checkinDays, setCheckinDays] = useState([]);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);

  useEffect(() => {
    const storedCheckinDays = JSON.parse(localStorage.getItem('checkinDays')) || [];
    setCheckinDays(storedCheckinDays);

    const today = new Date().toISOString().split('T')[0];
    setTodayCheckedIn(storedCheckinDays.includes(today));
  }, []);

  const handleCheckin = (day) => {
    const newCheckinDays = [...checkinDays, day];
    setCheckinDays(newCheckinDays);
    localStorage.setItem('checkinDays', JSON.stringify(newCheckinDays));
    setTodayCheckedIn(true);
  };

  const isToday = (day) => {
    const today = new Date().toISOString().split('T')[0];
    return today === day;
  };

  const isPastDay = (day) => {
    const today = new Date().toISOString().split('T')[0];
    return new Date(day) < new Date(today);
  };

  const renderDayCell = (day, currentMonth) => {
    const dayString = `${currentMonth}-${String(day).padStart(2, '0')}`;
    const checkedIn = checkinDays.includes(dayString);

    return (
      <td key={day} className={checkedIn ? 'checked-in' : ''}>
        {isPastDay(dayString) ? (
          <span>{day}</span>
        ) : (
          <button
            onClick={() => handleCheckin(dayString)}
            disabled={checkedIn || isPastDay(dayString)}
          >
            {day}
          </button>
        )}
      </td>
    );
  };

  const getCurrentMonthString = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  };

  const currentMonth = getCurrentMonthString();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateCalendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPreviousMonth = getDaysInMonth(year, month - 1);

    const calendar = [];
    let week = [];

    // Fill in the days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      week.push(
        <td key={`prev-${i}`} className="prev-month">
          {daysInPreviousMonth - firstDayOfMonth + 1 + i}
        </td>
      );
    }

    // Fill in the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(renderDayCell(day, currentMonth));
      if (week.length === 7) {
        calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);
        week = [];
      }
    }

    // Fill in the days from the next month
    for (let i = 1; week.length < 7; i++) {
      week.push(
        <td key={`next-${i}`} className="next-month">
          {i}
        </td>
      );
    }
    calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);

    return calendar;
  };

  return (
    <div className="checkin">
      <h2>Daily Checkin</h2>
      <div className="calendar-controls">
        <button>&lt;</button>
        <span>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button>&gt;</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      <div className="rewards">
        <h3>Consecutive Check-ins: {checkinDays.length} DAYS!</h3>
        <h4>Received your check-ins rewards!</h4>
        <ul>
          <li>Hi, my new friend! <button disabled>Received!</button></li>
          <li>Wow, streak 3 days! <button>Receive</button></li>
          <li>Friends for a week now! <button>Receive</button></li>
          <li>12-day anniversary! <button>Receive</button></li>
        </ul>
      </div>
    </div>
  );
};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
      dispatch({type: diplayTypeStr})
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {dispatchDisplay};

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);
