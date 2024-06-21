import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../style/info.css";
import { Home } from "lucide-react";

const Info = ({ displayList, dispatchDisplay }) => {
  const tabs = ["Daily Checkin", "Global Ranking", "Received Rewards"];
  const [activeTab, setActiveTab] = useState("Global Ranking");

  useEffect(() => {
    async function fetchData() {
      if (displayList.displayScoreboard) {
        setActiveTab("Global Ranking");
      }
      else if (displayList.displayReward) {
        setActiveTab("Received Rewards");
      }
      else if (displayList.displayCheckin) {
        setActiveTab("Daily Checkin");
      }
    }
    fetchData();
  }, [displayList]);

  const fnDisplayTab = (option) => {
    setActiveTab(option);
    switch (option) {
      case "Global Ranking":
        dispatchDisplay("DISPLAY_SCOREBOARD");
        break;
      case "Received Rewards":
        dispatchDisplay("DISPLAY_REWARD");
        break;
      case "Daily Checkin":
        dispatchDisplay("DISPLAY_CHECKIN");
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.container}>
      <button
        className="return-button"
        onClick={() => dispatchDisplay("DISPLAY_HOME_USER")}
      >
        Return to Home
      </button>
      <div style={styles.navbar} className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.activeTab : styles.inactiveTab),
            }}
            onClick={() => fnDisplayTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const dispatchDisplay = (displayTypeStr) => {
  return (dispatch) => {
    dispatch({ type: displayTypeStr });
  };
};

const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
});

const mapStateToProps = ({ display }) => ({
    displayList: display.displayList
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    width: "80%",
    margin: "20px auto",
    borderRadius: "8px",
    overflow: "hidden",
    minWidth: "500px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    borderBottom: "1px solid #ccc",
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    cursor: "pointer",
    textAlign: "center",
    minWidth: "150px",
    width: "90%",
  },
  activeTab: {
    backgroundColor: "cyan",
    fontWeight: "bold",
    color: "black",
  },
  inactiveTab: {
    backgroundColor: "#f9f9f9",
    color: "black",
  },
  content: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    margin: "10px 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    height: "50vh",
    overflow: "auto",
  },
  header: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left",
    color: "#f00",
  },
  cell: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
  tbody: {
    height: "50vh",
    overflow: "scroll",
  },
};
