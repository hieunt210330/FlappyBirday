import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/reward.css';
import { getUserVouchers } from '../../api/database';

import { curUserId } from '../../class/user';

const Reward = ({ dispatchDisplay }) => {
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    useEffect(() => {
        const fetchVouchers = async () => {
            const userId = curUserId; // Adjust based on how you get the user ID
            const voucherList = await getUserVouchers(userId);
            setVouchers(voucherList);
        };

        fetchVouchers();
    }, []);

    const data = React.useMemo(() => {
        return vouchers.map((voucher, index) => {
            const voucherData = {
                number: index + 1,
                id: voucher.id,
                expiryDate: voucher.expiryDate ? new Date(voucher.expiryDate).toLocaleDateString() : null,
                used: voucher.used ? 'Used' : 'Unused',
            };

            if (voucher.discountPercentage) {
                voucherData.discountPercentage = voucher.discountPercentage + "%";
            }
        
            if (voucher.maxDiscountValue) {
                voucherData.maxDiscountValue = voucher.maxDiscountValue + " USD";
            }
            if (voucher.minOrderValue) {
                voucherData.minOrderValue = voucher.minOrderValue + " USD";
            }
            if (voucher.discountValue) {
                voucherData.discountValue = voucher.discountValue + " USD";
            }

            return voucherData;
        });
    }, [vouchers]);

    const columns = React.useMemo(() => {
        const cols = [
            { Header: 'Number', accessor: 'number' },
            { Header: 'Expiry Date', accessor: 'expiryDate' },
            { Header: 'Used', accessor: 'used' },
        ];

        if (data.some(voucher => voucher.discountPercentage)) {
            cols.push({ Header: 'Discount Percentage', accessor: 'discountPercentage' });
        }

        if (data.some(voucher => voucher.maxDiscountValue)) {
            cols.push({ Header: 'Max Discount Value', accessor: 'maxDiscountValue' });
        }
        if (data.some(voucher => voucher.minOrderValue)) {
            cols.push({ Header: 'Min Order Value', accessor: 'minOrderValue' });
        }
        if (data.some(voucher => voucher.discountValue)) {
            cols.push({ Header: 'Discount Value', accessor: 'discountValue' });
        }

        return cols;
    }, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const handleRowClick = (row) => {
        setSelectedVoucher(row.original);
    };

    const closeModal = () => {
        setSelectedVoucher(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Rewards</h2>
                <div className="table-container">
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className="header">
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className="row"
                                        onClick={() => handleRowClick(row)}
                                    >
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="cell">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {selectedVoucher && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Voucher Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <p><strong>Number:</strong> {selectedVoucher.number}</p>
                                {selectedVoucher.maxDiscountValue && <p><strong>Max Discount Value:</strong> {selectedVoucher.maxDiscountValue}</p>}
                                {selectedVoucher.minOrderValue && <p><strong>Min Order Value:</strong> {selectedVoucher.minOrderValue}</p>}
                                {selectedVoucher.discountValue && <p><strong>Discount Value:</strong> {selectedVoucher.discountValue}</p>}
                                {selectedVoucher.expiryDate && <p><strong>Expiry Date:</strong> {selectedVoucher.expiryDate}</p>}
                                <p><strong>Used:</strong> {selectedVoucher.used}</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal} className="close-button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Reward);
