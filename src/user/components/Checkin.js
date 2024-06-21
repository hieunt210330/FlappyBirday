import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  saveCheckInDate,
  getCheckInDates,
  hasCheckedInToday,
  getConsecutiveCheckIns,
  hasReceivedStreakRewardThree,
  hasReceivedStreakRewardSeven,
  hasReceivedStreakRewardTwelve,
  receiveStreakRewardThree,
  receiveStreakRewardSeven,
  receiveStreakRewardTwelve,
} from '../../api/database';

import { curUserId } from '../../class/user';

import '../style/checkin.css';

const Checkin = ({ dispatchDisplay }) => {
  const [checkinDays, setCheckinDays] = useState([]);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [rewards, setRewards] = useState({
    threeDays: { received: false, eligible: false },
    fiveDays: { received: false, eligible: false },
    twelveDays: { received: false, eligible: false },
  });
  const userId = curUserId;

  useEffect(() => {
    const fetchCheckinDays = async () => {
      try {
        const checkinDays = await getCheckInDates(userId, currentMonth, currentYear);
        setCheckinDays(checkinDays);

        const checkedInToday = await hasCheckedInToday(userId);
        setTodayCheckedIn(checkedInToday);
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
      setCheckinDays([...checkinDays, today]);
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
    const checkedIn = checkinDays.includes(dayString);

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
        {(isPastDay(dayString) && isToday(dayString)) || checkedIn ? (
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

  const checkAndReceiveRewards = async () => {
    try {
      const rewardStatus = {
        threeDays: { received: await hasReceivedStreakRewardThree(userId), eligible: await getConsecutiveCheckIns(userId, 3) },
        fiveDays: { received: await hasReceivedStreakRewardSeven(userId), eligible: await getConsecutiveCheckIns(userId, 5) },
        twelveDays: { received: await hasReceivedStreakRewardTwelve(userId), eligible: await getConsecutiveCheckIns(userId, 12) },
      };

      setRewards(rewardStatus);

      if (rewardStatus.threeDays.eligible && !rewardStatus.threeDays.received) {
        await receiveStreakRewardThree(userId);
        alert('Received reward for 3 consecutive check-ins!');
      }
      if (rewardStatus.fiveDays.eligible && !rewardStatus.fiveDays.received) {
        await receiveStreakRewardSeven(userId);
        alert('Received reward for 7 consecutive check-ins!');
      }
      if (rewardStatus.twelveDays.eligible && !rewardStatus.twelveDays.received) {
        await receiveStreakRewardTwelve(userId);
        alert('Received reward for 12 consecutive check-ins!');
      }
    } catch (error) {
      console.error('Error checking and receiving rewards:', error);
    }
  };

  useEffect(() => {
    checkAndReceiveRewards();
  }, [checkinDays]);

  const renderRewardButton = (eligible, received, receiveFunc, label) => {
    const buttonStyle = {
      backgroundColor: 'gray',
      cursor: 'default',
      opacity: eligible && !received ? 1 : 0.6,
    };

    return (
      <button
        className="reward-button"
        style={buttonStyle}
        onClick={receiveFunc}
        disabled={!eligible || received}
      >
        {received ? 'Received' : 'Receive'}
      </button>
    );
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
              <span className="reward-text">Wow, streak 3 days!</span>
              {renderRewardButton(rewards.threeDays.eligible, rewards.threeDays.received, () => receiveStreakRewardThree(userId), 'Wow, streak 3 days!')}
            </li>
            <li className="reward-item">
              <span className="reward-text">Friends for a week now!</span>
              {renderRewardButton(rewards.fiveDays.eligible, rewards.fiveDays.received, () => receiveStreakRewardSeven(userId), 'Friends for a week now!')}
            </li>
            <li className="reward-item">
              <span className="reward-text">12-day anniversary!</span>
              {renderRewardButton(rewards.twelveDays.eligible, rewards.twelveDays.received, () => receiveStreakRewardTwelve(userId), '12-day anniversary!')}
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
