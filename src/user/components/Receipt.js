import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../style/receipt.css';
import { getUserReceipts, claimReceipt } from '../../api/database';
import { curUserId } from '../../class/user';

const Receipt = ({ dispatchDisplay }) => {
    const [bills, setReceipts] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            const billList = await getUserReceipts(curUserId);
            if (billList === null) {
                billList = [];
            }
            setReceipts(billList);
        };

        fetchReceipts();
    }, []);

    const handleClaim = async (id) => {
        const response = await claimReceipt(id);
        if (response === null) {
            alert('Failed to claim receipt. Please try again later.');
        }
        alert(response);
        const updatedReceipts = await getUserReceipts(curUserId);
        setReceipts(updatedReceipts);
    };

    return (
        <div className="receipt-container">
            <button className="home-button" onClick={() => dispatchDisplay('DISPLAY_HOME_USER')}>Home</button>

            <h2 className="title">My Receipts</h2>
            <div className="receipt-list">
                {bills.map((receipt, index) => (
                    <div key={index} className="receipt-item">
                        <p><strong>ID:</strong> {receipt.id}</p>
                        <p><strong>Total:</strong> {receipt.total}</p>
                        <p><strong>Number of turns:</strong> +{Math. floor(receipt.total / 10)}</p>
                        <p><strong>Created At:</strong> {new Date(receipt.createdAt).toLocaleDateString()}</p>
                        <button
                            className={`claim-button ${receipt.isClaimed ? 'claimed' : ''}`}
                            onClick={() => handleClaim(receipt.id, receipt.total)}
                            disabled={receipt.isClaimed}
                        >
                            {receipt.isClaimed ? 'Claimed' : 'Claim'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchDisplay: (displayTypeStr) => dispatch({ type: displayTypeStr }),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
