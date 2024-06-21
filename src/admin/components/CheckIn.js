import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/checkin.css';
import { getAllCheckIns, deleteCheckIn, updateCheckIn, createCheckIn } from '../../api/database';

const CheckIn = ({ dispatchDisplay, searchPattern }) => {
    const [checkIns, setCheckIns] = useState([]);
    const [selectedCheckIn, setSelectedCheckIn] = useState(null);
    const [editCheckIn, setEditCheckIn] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCheckInId, setSelectedCheckInId] = useState(null);

    useEffect(() => {
        const fetchCheckIns = async () => {
            const checkInList = await getAllCheckIns(searchPattern);
            if (checkInList === null) {
                checkInList = [];
            }
            setCheckIns(checkInList);
        };

        fetchCheckIns();
    }, [searchPattern]);

    const handleDelete = async (id) => {
        await deleteCheckIn(id);
        setCheckIns(checkIns.filter(checkIn => checkIn.id !== id));
        const updatedCheckIns = await getAllCheckIns(searchPattern);
        setCheckIns(updatedCheckIns);

    };

    const handleEdit = (checkIn) => {
        setSelectedCheckInId(checkIn.id);
        setEditCheckIn(checkIn);
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        setEditCheckIn({ ...editCheckIn, id: selectedCheckInId });
        await updateCheckIn(editCheckIn);
        setIsEditModalOpen(false);
        setSelectedCheckInId(null);
        setEditCheckIn(null);
        const updatedCheckIns = await getAllCheckIns(searchPattern);
        setCheckIns(updatedCheckIns);
    };

    const handleCreate = async (newCheckIn) => {
        await createCheckIn(newCheckIn);
        setIsCreateModalOpen(false);
        const updatedCheckIns = await getAllCheckIns(searchPattern);
        setCheckIns(updatedCheckIns);
    };

    const data = React.useMemo(() => {
        return checkIns.map((checkIn, index) => ({
            number: index + 1,
            id: checkIn.id,
            createdAt: new Date(checkIn.createdAt).toLocaleDateString(),
            userName: checkIn.checkIn.user.name,
        }));
    }, [checkIns]);

    const columns = React.useMemo(() => [
        { Header: 'Number', accessor: 'number' },
        { Header: 'ID', accessor: 'id' },
        { Header: 'Created At', accessor: 'createdAt' },
        { Header: 'User Name', accessor: 'userName' },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
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
    ], [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const closeModal = () => {
        setSelectedCheckIn(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Check-Ins</h2>
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
                                        onClick={() => setSelectedCheckIn(row.original)}
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
                {selectedCheckIn && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Check-In Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                {selectedCheckIn.id && <p><strong>ID:</strong> {selectedCheckIn.id}</p>}
                                {selectedCheckIn.createdAt && <p><strong>Created At:</strong> {selectedCheckIn.createdAt}</p>}
                                {selectedCheckIn.checkInId && <p><strong>Check-In ID:</strong> {selectedCheckIn.checkInId}</p>}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn);

const CreateCheckInModal = ({ onClose, onCreate }) => {
    const [checkInId, setCheckInId] = useState('');

    const handleSubmit = () => {
        onCreate({
            checkInId,
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Create New Check-In</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-content">
                    <label>Check-In ID:</label>
                    <input
                        type="text"
                        placeholder="Check-In ID"
                        value={checkInId}
                        onChange={(e) => setCheckInId(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button onClick={handleSubmit} className="submit-button">Create</button>
                </div>
            </div>
        </div>
    );
};
