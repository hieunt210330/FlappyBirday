import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import '../style/feedback.css';

import {
  getUserFeedbacks,
  saveUserFeedback
} from '../../api/database';

import { curUserId } from '../../class/user';

const Feedback = ({ dispatchDisplay }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [viewingFeedbacks, setViewingFeedbacks] = useState(false);
  const userId = curUserId;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const userFeedbacks = await getUserFeedbacks(userId);
        setFeedbacks(userFeedbacks);
      } catch (error) {
        //console.error('Error fetching feedbacks:', error);
      }
    };

    if (viewingFeedbacks) {
      fetchFeedbacks();
    }
  }, [viewingFeedbacks, userId]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUserFeedback(userId, feedback);
      setFeedback("");
      alert('Feedback submitted successfully');
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleViewFeedbacks = () => {
    setViewingFeedbacks(true);
  };

  const handleGiveFeedback = () => {
    setViewingFeedbacks(false);
  };

  return (
    <div className="feedback-container">
      <button className="home-button" onClick={() => dispatchDisplay('DISPLAY_HOME_USER')}>Home</button>
      {viewingFeedbacks ? (
        <div className="feedback-list">
          <h2>Your Feedbacks</h2>
          <ul>
            {feedbacks.map((fb) => (
              <li key={fb.id}>
                <p>{fb.message}</p>
                <small>{new Date(fb.createdAt).toLocaleString()}</small>
                
                {(fb.response !== null && fb.response !== undefined && fb.response.length !==0) ? (<p>Reply: {fb.response}</p>): null}
                </li>
            ))}
          </ul>
          <button className="feedback-button" onClick={handleGiveFeedback}>Give a feedback</button>
        </div>
      ) : (
        <div className="feedback-form">
          <h2>Give a Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback here"
              required
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          <button className="feedback-button" onClick={handleViewFeedbacks}>View your Feedbacks</button>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

export default connect(null, mapDispatchToProps)(Feedback);
