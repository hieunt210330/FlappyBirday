import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../style.css';

const Info = ({dispatchDisplay}) => {

    const tabs = ['Global Ranking', 'Received Rewards', 'Daily Checkin'];

	const [activeTab, setActiveTab] = useState(screen);

    const fnDisplayTab = (option) => {
		setActiveTab(option);
        switch (option) {
            case 'Global Ranking':
                dispatchDisplay("DISPLAY_SCOREBOARD");
                break;
            case 'Received Rewards':
                dispatchDisplay("DISPLAY_REWARD");

                break;
            case 'Daily Checkin':
                dispatchDisplay("DISPLAY_CHECKIN");
                break;
                
            default:
                break;
        }
    };

    return (
        <div style={styles.container}>
            <button className="return-button" onClick={() => dispatchDisplay('DISPLAY_HOME')}>Return to Home</button>
            <div style={styles.navbar} className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : styles.inactiveTab) }}
                        onClick={() => fnDisplayTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Info);

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        width: '80%',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        minWidth: '500px',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-around',
        borderBottom: '1px solid #ccc',
    },
    tab: {
        flex: 1,
        padding: '10px 0',
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: '150px',
        width: '90%',
    },
    activeTab: {
        backgroundColor: '#dfeaff',
        fontWeight: 'bold',
    },
    inactiveTab: {
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        margin: '10px 0',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        height: "50vh",
        overflow: "auto",
    },
    header: {
        borderBottom: '2px solid #ddd',
        padding: '10px',
        textAlign: 'left',
        color: '#f00',
    },
    cell: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
    },
    tbody: {
        height: "50vh",
        overflow: "scroll",
    },
};
