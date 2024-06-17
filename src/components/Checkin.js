import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const Checkin = ({ dispatchDisplay }) => {
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
      <td key={day} className={checkedIn ? 'checked-in' : ''} style={styles.dayCell}>
        {isPastDay(dayString) ? (
          <span>{day}</span>
        ) : (
          <button
            onClick={() => handleCheckin(dayString)}
            disabled={checkedIn || isPastDay(dayString)}
            style={checkedIn ? styles.checkedInButton : styles.dayButton}
          >
            {checkedIn ? <Check size={16} /> : day}
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
        <td key={`prev-${i}`} className="prev-month" style={styles.prevMonth}>
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
        <td key={`next-${i}`} className="next-month" style={styles.nextMonth}>
          {i}
        </td>
      );
    }
    calendar.push(<tr key={`week-${calendar.length}`}>{week}</tr>);

    return calendar;
  };

  return (
    <div className="checkin" style={styles.checkin}>
      <h2 style={styles.title}>Daily Checkin</h2>
      <div className="calendar-controls" style={styles.calendarControls}>
        <button style={styles.controlButton}><ChevronLeft /></button>
        <span>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button style={styles.controlButton}><ChevronRight /></button>
      </div>
      <table className="calendar" style={styles.calendar}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>S</th>
            <th style={styles.tableHeader}>M</th>
            <th style={styles.tableHeader}>T</th>
            <th style={styles.tableHeader}>W</th>
            <th style={styles.tableHeader}>T</th>
            <th style={styles.tableHeader}>F</th>
            <th style={styles.tableHeader}>S</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>
      <div className="rewards" style={styles.rewards}>
        <h3 style={styles.subtitle}>Consecutive Check-ins: {checkinDays.length} DAYS!</h3>
        <h4 style={styles.subtitle}>Received your check-ins rewards!</h4>
        <ul style={styles.rewardsList}>
          <li style={styles.rewardItem}>
            <span style={styles.rewardText}>Hi, my new friend!</span>
            <button style={styles.rewardButton} disabled>Received!</button>
          </li>
          <li style={styles.rewardItem}>
            <span style={styles.rewardText}>Wow, streak 3 days!</span>
            <button style={styles.rewardButton}>Receive</button>
          </li>
          <li style={styles.rewardItem}>
            <span style={styles.rewardText}>Friends for a week now!</span>
            <button style={styles.rewardButton}>Receive</button>
          </li>
          <li style={styles.rewardItem}>
            <span style={styles.rewardText}>12-day anniversary!</span>
            <button style={styles.rewardButton}>Receive</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  checkin: {
    fontFamily: 'Arial, sans-serif',
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  calendarControls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  controlButton: {
    backgroundColor: '#ddd',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
  },
  calendar: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
  },
  tableHeader: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    color: '#333',
  },
  dayCell: {
    padding: '20px',
    textAlign: 'center',
    fontSize: '18px',
  },
  dayButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  checkedInButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  rewards: {
    marginTop: '20px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#333',
    fontSize: '20px',
    marginBottom: '10px',
  },
  rewardsList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rewardItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    width: '80%',
  },
  rewardText: {
    flex: 1,
    textAlign: 'left',
  },
  rewardButton: {
    marginLeft: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  prevMonth: {
    color: '#ccc',
    textAlign: 'center',
  },
  nextMonth: {
    color: '#ccc',
    textAlign: 'center',
  },
};

const dispatchDisplay = (displayTypeStr) => {
  return (dispatch) => {
    dispatch({ type: displayTypeStr });
  };
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { dispatchDisplay };

export default connect(mapStateToProps, mapDispatchToProps)(Checkin);
