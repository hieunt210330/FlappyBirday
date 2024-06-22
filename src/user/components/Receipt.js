import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../style/bill.css';
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
        await claimReceipt(id);
        const updatedReceipts = await getUserReceipts(curUserId);
        setReceipts(updatedReceipts);
    };

    return (
        <div className="bill-container">
            <h2 className="title">My Receipts</h2>
            <div className="bill-list">
                {bills.map((bill, index) => (
                    <div key={index} className="bill-item">
                        <p><strong>ID:</strong> {bill.id}</p>
                        <p><strong>Total:</strong> {bill.total}</p>
                        <p><strong>Number of turns:</strong> +{bill.total / 10}</p>
                        <p><strong>Created At:</strong> {new Date(bill.createdAt).toLocaleDateString()}</p>
                        <button
                            className={`claim-button ${bill.isClaimed ? 'claimed' : ''}`}
                            onClick={() => handleClaim(bill.id, bill.total)}
                            disabled={bill.isClaimed}
                        >
                            {bill.isClaimed ? 'Claimed' : 'Claim'}
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
