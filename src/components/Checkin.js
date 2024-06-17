import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  getCheckInDates,
  saveCheckInDate,
} from '../api/database';
import '../style/checkin.css';

const Checkin = ({ dispatchDisplay }) => {
  const [checkinDays, setCheckinDays] = useState([]);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const userId = process.env.USER_ID;

  useEffect(() => {
    const fetchCheckinDays = async () => {
      try {
        const checkinDays = await getCheckInDates(userId, currentMonth, currentYear);
        setCheckinDays(checkinDays);
        
        const today = new Date().toISOString().split('T')[0];
        setTodayCheckedIn(checkinDays.some(day => day.date === today));
      } catch (error) {
        console.error('Error fetching check-in dates:', error);
      }
    };

    fetchCheckinDays();
  }, [currentMonth, currentYear, userId]);

  const handleCheckin = async (day) => {
    const today = new Date().toISOString().split('T')[0];
    if (day !== today) return;

    try {
      await saveCheckInDate(userId);
      setCheckinDays([...checkinDays, { date: today }]);
      setTodayCheckedIn(true);
      alert('Check-in successful!');
    } catch (error) {
      console.error('Error saving check-in date:', error);
    }
  };

  const isToday = (day) => {
    const today = new Date().toISOString().split('T')[0];
    return today === day;
  };

  const isPastDay = (day) => {
    const today = new Date().toISOString().split('T')[0];
    return new Date(day) < new Date(today);
  };

  const renderDayCell = (day) => {
    const dayString = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const checkedIn = checkinDays.some(d => d.date === dayString);

    let backgroundColor = 'white';
    if (checkedIn) {
      backgroundColor = 'cyan';
    } else if (isPastDay(dayString)) {
      backgroundColor = 'gray';
    }

    const dayStyle = {
      backgroundColor,
      cursor: isToday(dayString) && !checkedIn ? 'pointer' : 'default',
    };

    return (
      <td key={day} style={dayStyle} className="day-cell">
        {isPastDay(dayString) || checkedIn ? (
          <span>{day}</span>
        ) : (
          <button
            onClick={() => handleCheckin(dayString)}
            disabled={checkedIn || !isToday(dayString)}
            className="day-button"
          >
            {day}
          </button>
        )}
      </td>
    );
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateCalendar = () => {
    const year = currentYear;
    const month = currentMonth;
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const daysInPreviousMonth = getDaysInMonth(year, month - 1);

    const calendar = [];
    let week = [];

    // Fill in the days from the previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      week.push(
        <td key={`prev-${i}`} className="prev-month day-cell">
          {daysInPreviousMonth - firstDayOfMonth + 1 + i}
        </td>
      );
    }

    // Fill in the days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(renderDayCell(day));
      if (week.length === 7) {
        calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);
        week = [];
      }
    }

    // Fill in the days from the next month
    for (let i = 1; week.length < 7; i++) {
      week.push(
        <td key={`next-${i}`} className="next-month day-cell">
          {i}
        </td>
      );
    }
    calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);

    return calendar;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="checkin-container">
      <div className="checkin-content">
        <div className="calendar-section">
          <h2 className="title">Daily Checkin</h2>
          <div className="calendar-controls">
            <button onClick={handlePreviousMonth} className="control-button"><ChevronLeft /></button>
            <span>{new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={handleNextMonth} className="control-button"><ChevronRight /></button>
          </div>
          <table className="calendar">
            <thead>
              <tr>
                <th className="table-header">S</th>
                <th className="table-header">M</th>
                <th className="table-header">T</th>
                <th className="table-header">W</th>
                <th className="table-header">T</th>
                <th className="table-header">F</th>
                <th className="table-header">S</th>
              </tr>
            </thead>
            <tbody>{generateCalendar()}</tbody>
          </table>
        </div>
        <div className="rewards-section">
          <h3 className="subtitle">Consecutive Check-ins: {checkinDays.length} DAYS!</h3>
          <h4 className="subtitle">Received your check-ins rewards!</h4>
          <ul className="rewards-list">
            <li className="reward-item">
              <span className="reward-text">Hi, my new friend!</span>
              <button className="reward-button" disabled>Received!</button>
            </li>
            <li className="reward-item">
              <span className="reward-text">Wow, streak 3 days!</span>
              <button className="reward-button">Receive</button>
            </li>
            <li className="reward-item">
              <span className="reward-text">Friends for a week now!</span>
              <button className="reward-button">Receive</button>
            </li>
            <li className="reward-item">
              <span className="reward-text">12-day anniversary!</span>
              <button className="reward-button">Receive</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const dispatchDisplay = (displayTypeStr) => {
  return (dispatch) => {
    dispatch({ type: displayTypeStr });
  };
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { dispatchDisplay };

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);
