import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/user.css';
import { getAllUser, deleteUser, updateUser, createUser } from '../../api/database';

const User = ({ dispatchDisplay, searchPattern }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

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

    const handleDelete = async (id) => {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (user) => {
        setSelectedUserId(user.id)
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        setEditUser({ ...editUser, id: selectedUserId });
        await updateUser(editUser);
        setIsEditModalOpen(false);
        setSelectedUserId(null);
        setEditUser(null);
        // Fetch updated user list
        const updatedUsers = await getAllUser(searchPattern);
        setUsers(updatedUsers);
    };

    const handleCreate = async (newUser) => {
        await createUser(newUser.email, newUser.name, newUser.password, newUser.role);
        setIsCreateModalOpen(false);
        // Fetch updated user list
        const updatedUsers = await getAllUser(searchPattern);
        setUsers(updatedUsers);
    };

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
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(row.original);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(row.original.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )
            },
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

    const closeModal = () => {
        setSelectedUser(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Users</h2>
                <button className="new-user-button" onClick={() => setIsCreateModalOpen(true)}>Create New User</button>
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
                                        onClick={() => setSelectedUser(row.original)}
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
                                {selectedUser.id && <p><strong>ID:</strong> {selectedUser.id}</p>}
                                {selectedUser.email && <p><strong>Email:</strong> {selectedUser.email}</p>}
                                {selectedUser.name && <p><strong>Name:</strong> {selectedUser.name}</p>}
                                {selectedUser.role && <p><strong>Role:</strong> {selectedUser.role}</p>}
                                {selectedUser.turnLeft !== null && <p><strong>Turn Left:</strong> {selectedUser.turnLeft}</p>}
                                {selectedUser.puzzleCount !== null&& <p><strong>Puzzle Count:</strong> {selectedUser.puzzleCount}</p>}
                                {selectedUser.maxScore !== null && <p><strong>Max Score:</strong> {selectedUser.maxScore}</p>}
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal} className="close-button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
                {isEditModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Edit User</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={editUser.name}
                                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                />
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={editUser.email}
                                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                />
                                <div style={{ paddingBottom: '20px' }}>
                                    <label>Role:</label>
                                    <select
                                        value={editUser.role}
                                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                    >
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <label>Turn Left:</label>
                                <input
                                    type="number"
                                    value={editUser.turnLeft}
                                    onChange={(e) => setEditUser({ ...editUser, turnLeft: e.target.value })}
                                />
                                <label>Puzzle Count:</label>
                                <input
                                    type="number"
                                    value={editUser.puzzleCount}
                                    onChange={(e) => setEditUser({ ...editUser, puzzleCount: e.target.value })}
                                />
                                <label>Max Score:</label>
                                <input
                                    type="number"
                                    value={editUser.maxScore}
                                    onChange={(e) => setEditUser({ ...editUser, maxScore: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleSave} className="submit-button">Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {isCreateModalOpen && (
                    <CreateUserModal
                        onClose={() => setIsCreateModalOpen(false)}
                        onCreate={handleCreate}
                    />
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

const CreateUserModal = ({ onClose, onCreate }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const handleSubmit = () => {
        onCreate({ email, name, role, password });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Create New User</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-content">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <div className="modal-footer">
                    <button onClick={handleSubmit} className="submit-button">Create</button>
                </div>
            </div>
        </div>
    );
};
