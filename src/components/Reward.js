import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/reward.css';

const Reward = ({ dispatchDisplay }) => {
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    const data = React.useMemo(
        () => [
            { rank: 'Voucher rank 1', username: 'Voucher Brief Info 1', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 2', username: 'Voucher Brief Info 2', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 3', username: 'Voucher Brief Info 3', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 4', username: 'Voucher Brief Info 4', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 5', username: 'Voucher Brief Info 5', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 6', username: 'Voucher Brief Info 6', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 7', username: 'Voucher Brief Info 7', score: 'DD/MM/YYYY' },
            { rank: 'Voucher rank 8', username: 'Voucher Brief Info 8', score: 'DD/MM/YYYY' },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Rank',
                accessor: 'rank',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Score',
                accessor: 'score',
            },
        ],
        []
    );

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
                                <p><strong>Rank:</strong> {selectedVoucher.rank}</p>
                                <p><strong>Username:</strong> {selectedVoucher.username}</p>
                                <p><strong>Score:</strong> {selectedVoucher.score}</p>
                                <p><strong>Details:</strong> {selectedVoucher.username}</p>
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
