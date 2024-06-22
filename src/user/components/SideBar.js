import React, { useState } from "react";
import { connect } from "react-redux";

import "../style/sidebar.css";
import {
  LogOut,
  CircleHelp,
  CalendarCheck2,
  Trophy,
  Menu,
  TicketCheck,
  Puzzle,
  BugOff,
  Receipt
  
} from "lucide-react";

const Sidebar = ({ dispatchDisplay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <Menu color="currentColor" alt="Toggle" />
        </button>
        {isExpanded && (
          <>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_RULES")}
              title="Rules"
            >
              <CircleHelp color="currentColor" alt="Rules" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_RECEIPT")}
              title="Receipts"
            >
              <Receipt color="currentColor" alt="Receipts" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_CHECKIN")}
              title="Checkin"
            >
              <CalendarCheck2 color="currentColor" alt="Checkin" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_SCOREBOARD")}
              title="Scoreboard"
            >
              <Trophy color="currentColor" alt="Scoreboard" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_REWARD")}
              title="Checkin"
            >
              <TicketCheck color="currentColor" alt="ScorRewardeboard" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_PUZZLE")}
              title="Puzzle"
            >
              <Puzzle color="currentColor" alt="Puzzle" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_FEEDBACK")}
              title="Feedback"
            >
              <BugOff color="currentColor" alt="Feedback" />
            </button>
            <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_LOGIN")}
              title="Logout"
            >
              <LogOut color="currentColor" alt="Logout" />
            </button>

          </>
        )}
      </div>
    </div>
  );
};

const dispatchDisplay = (diplayTypeStr) => {
  return (dispatch) => {
    dispatch({ type: diplayTypeStr });
  };
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { dispatchDisplay };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
