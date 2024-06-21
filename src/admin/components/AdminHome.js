import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import '../style/AdminHome.css';
import User from "./User";
import Feedback from "./Feedback";
import Voucher from "./Voucher";
import Score from "./Score";
import CheckIn from "./CheckIn";

import {
  LogOut,
} from "lucide-react";

const AdminHome = ({ dispatchDisplay }) => {

  const [activeTab, setActiveTab] = useState('Users');
  const [searchPattern, setSearchPattern] = useState('');

  const fetchData = async (model) => {
    //const response = await fetch(`/api/${model.toLowerCase()}`);
    //const result = await response.json();
    //setData(result);
  };

  useEffect(() => {
    fetchData(activeTab.toLowerCase());
  }, [activeTab]);

  const handleSearch = (e) => {
    setSearchPattern(e.target.value);
  };

  return (
    <div className="admin-panel">
      <button
              className="sidebar-button"
              onClick={() => dispatchDisplay("DISPLAY_LOGIN")}
              title="Logout"
      >
        <LogOut color="currentColor" alt="Logout" />
      </button>

      <nav>
        {['Users', 'Feedbacks', 'Vouchers', 'Scores', 'CheckIns'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
      <div className="content">
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={searchPattern}
          onChange={handleSearch}
        />
      </div>
      {activeTab === 'Users' && <User searchPattern={searchPattern}/>}
      {activeTab === 'Feedbacks' && <Feedback searchPattern={searchPattern}/>}
      {activeTab === 'Vouchers' && <Voucher searchPattern={searchPattern}/>}
      {activeTab === 'Scores' && <Score searchPattern={searchPattern}/>}
      {activeTab === 'CheckIns' && <CheckIn searchPattern={searchPattern}/>}
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
  });
  
  export default connect(null, mapDispatchToProps)(AdminHome);