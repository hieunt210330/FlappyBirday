import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/receipt.css';
import { getAllReceipts, deleteReceipt, updateReceipt, createReceipt } from '../../api/database';

const receipt = ({ dispatchDisplay, searchPattern }) => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [editReceipt, setEditReceipt] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedReceiptId, setSelectedReceiptId] = useState(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            const receiptList = await getAllReceipts(searchPattern);
            console.log(receiptList);
            if (receiptList === null) {
                receiptList = [];
            }
            const ReceiptListWithUserNames = await Promise.all(
                receiptList.map(async receipt => ({
                    ...receipt,
                }))
            );
            setReceipts(ReceiptListWithUserNames);
        };

        fetchReceipts();
    }, [searchPattern]);

    const handleDelete = async (id) => {
        const response = await deleteReceipt(id);
        if (response === null) {
            alert('Failed to delete receipt');
        }
        setReceipts(receipts.filter(receipt => receipt.id !== id));
    };

    const handleEdit = (receipt) => {
        setSelectedReceiptId(receipt.id);
        setEditReceipt(receipt);
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        setEditReceipt({ ...editReceipt, id: selectedReceiptId });
        const response = await updateReceipt(editReceipt);
        if (response === null) {
            alert('Failed to update receipt');
        }
        setIsEditModalOpen(false);
        setSelectedReceiptId(null);
        setEditReceipt(null);
        const updatedReceipts = await getAllReceipts(searchPattern);
        setReceipts(updatedReceipts);
    };

    const handleCreate = async (newReceipt) => {
        const response = await createReceipt(newReceipt.userId, newReceipt.total);
        setIsCreateModalOpen(false);
        if (response === null) {
            alert('Failed to create receipt');
        }
        const updatedReceipts = await getAllReceipts(searchPattern);
        setReceipts(updatedReceipts);
    };

    const data = React.useMemo(() => {
        return receipts.map((receipt, index) => ({
            number: index + 1,
            id: receipt?.id,
            userName: receipt?.user?.name,
            total: receipt?.total,
            isClaimed: receipt?.isClaimed ? 'Yes' : 'No',
            createdAt: new Date(receipt?.createdAt).toLocaleDateString(),
        }));
    }, [receipts]);

    const columns = React.useMemo(() => [
        { Header: 'Number', accessor: 'number' },
        { Header: 'ID', accessor: 'id' },
        { Header: 'User Name', accessor: 'userName' },
        { Header: 'Total', accessor: 'total' },
        { Header: 'Is Claimed', accessor: 'isClaimed' },
        { Header: 'Created At', accessor: 'createdAt' },
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
    ], [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    const closeModal = () => {
        setSelectedReceipt(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Receipts</h2>
                <button className="new-receipt-button" onClick={() => setIsCreateModalOpen(true)}>Create New receipt</button>
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
                                        onClick={() => setSelectedReceipt(row.original)}
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
                {selectedReceipt && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>receipt Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                {selectedReceipt.id && <p><strong>ID:</strong> {selectedReceipt.id}</p>}
                                {selectedReceipt.userName && <p><strong>User Name:</strong> {selectedReceipt.userName}</p>}
                                {selectedReceipt.total && <p><strong>Total:</strong> {selectedReceipt.total}</p>}
                                {selectedReceipt.isClaimed && <p><strong>Is Claimed:</strong> {selectedReceipt.isClaimed}</p>}
                                {selectedReceipt.createdAt && <p><strong>Created At:</strong> {selectedReceipt.createdAt}</p>}
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
                                <h3>Edit receipt</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <label>Total:</label>
                                <input
                                    type="number"
                                    value={editReceipt.total}
                                    onChange={(e) => setEditReceipt({ ...editReceipt, total: e.target.value })}
                                />
                                <label>Is Claimed:</label>
                                <select
                                    value={editReceipt.isClaimed}
                                    onChange={(e) => setEditReceipt({ ...editReceipt, isClaimed: e.target.value === 'Yes' })}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleSave} className="submit-button">Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {isCreateModalOpen && (
                    <CreateReceiptModal
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

export default connect(mapStateToProps, mapDispatchToProps)(receipt);

const CreateReceiptModal = ({ onClose, onCreate }) => {
    const [userId, setUserId] = useState('');
    const [total, setTotal] = useState('');

    const handleSubmit = () => {
        onCreate({ userId, total });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Create New receipt</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-content">
                    <label>User ID:</label>
                    <input
                        type="number"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <label>Total:</label>
                    <input
                        type="number"
                        placeholder="Total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button onClick={handleSubmit} className="submit-button">Create</button>
                </div>
            </div>
        </div>
    );
};
