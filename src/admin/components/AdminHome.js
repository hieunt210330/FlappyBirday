import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import '../style/AdminHome.css';
import User from "./User";
import Feedback from "./Feedback";
import Voucher from "./Voucher";


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
      <nav>
        {['Users', 'Feedbacks', 'Vouchers', 'Scores', 'CheckIns', 'CheckInDates'].map((tab) => (
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
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
  });
  
  export default connect(null, mapDispatchToProps)(AdminHome);