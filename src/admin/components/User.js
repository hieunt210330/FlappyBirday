import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/user.css';
import { 
    getAllUser
 } from '../../api/database';

const User = ({ dispatchDisplay, searchPattern  }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await getAllUser(searchPattern);
            if (userList === null) {
                userList = [];
            }
            setUsers(userList);
        };

        fetchUsers();
    }, [searchPattern]);

    const data = React.useMemo(() => {
        return users.map((user, index) => {
            const userData = {
                number: index + 1,
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.isAdmin ? 'Admin' : 'User',
                turnLeft: user.turnLeft,
                puzzleCount: user.puzzleCount,
                maxScore: user.maxScore,
            };
            return userData;
        });
    }, [users]);

    const columns = React.useMemo(() => {
        const cols = [
            { Header: 'Number', accessor: 'number' },
            { Header: 'ID', accessor: 'id' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Name', accessor: 'name' },
            { Header: 'Role', accessor: 'role' },
            { Header: 'Turn Left', accessor: 'turnLeft' },
            { Header: 'Puzzle Count', accessor: 'puzzleCount' },
            { Header: 'Max Score', accessor: 'maxScore' },
        ];

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
        setSelectedUser(row.original);
    };

    const closeModal = () => {
        setSelectedUser(null);
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
                {selectedUser && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>User Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <p><strong>Number:</strong> {selectedUser.number}</p>
                                {selectedUser.id && <p><strong>ID:</strong> {selectedUser.id}</p>}
                                {selectedUser.email && <p><strong>Email:</strong> {selectedUser.email}</p>}
                                {selectedUser.name && <p><strong>Name:</strong> {selectedUser.name}</p>}
                                {selectedUser.role && <p><strong>Role:</strong> {selectedUser.role}</p>}
                                {selectedUser.turnLeft && <p><strong>Turn Left:</strong> {selectedUser.turnLeft}</p>}
                                {selectedUser.puzzleCount && <p><strong>Puzzle Count:</strong> {selectedUser.puzzleCount}</p>}
                                {selectedUser.maxScore && <p><strong>Max Score:</strong> {selectedUser.maxScore}</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(User);
