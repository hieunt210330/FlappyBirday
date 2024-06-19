import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import '../style/AdminHome.css';

const AdminHome = ({ dispatchDisplay }) => {

  const [activeTab, setActiveTab] = useState('Users');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (model) => {
    //const response = await fetch(`/api/${model.toLowerCase()}`);
    //const result = await response.json();
    //setData(result);
  };

  useEffect(() => {
    fetchData(activeTab.toLowerCase());
  }, [activeTab]);

  const handleDelete = async (id) => {
    /*
    await fetch(`/api/${activeTab.toLowerCase()}/${id}`, {
      method: 'DELETE',
    });
    fetchData(activeTab.toLowerCase());
    */
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderTable = () => (
    <table>
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
            <td>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
          value={searchTerm}
          onChange={handleSearch}
        />
        {renderTable()}
      </div>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr })
  });
  
  export default connect(null, mapDispatchToProps)(AdminHome);