import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/voucher.css';
import { getAllVouchers, deleteVoucher, updateVoucher, createVoucher1 } from '../../api/database';

const Voucher = ({ dispatchDisplay, searchPattern }) => {
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [editVoucher, setEditVoucher] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    useEffect(() => {
        const fetchVouchers = async () => {
            const voucherList = await getAllVouchers(searchPattern);
            if (voucherList === null) {
                voucherList = [];
            }
            setVouchers(voucherList);
        };

        fetchVouchers();
    }, [searchPattern]);

    const handleDelete = async (id) => {
        await deleteVoucher(id);
        setVouchers(vouchers.filter(voucher => voucher.id !== id));
    };

    const handleEdit = (voucher) => {
        console.log(voucher);
        setSelectedVoucherId(voucher.id);
        setEditVoucher(voucher);
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        setEditVoucher({ ...editVoucher, id: selectedVoucherId });
        await updateVoucher(editVoucher);
        setIsEditModalOpen(false);
        setSelectedVoucherId(null);
        setEditVoucher(null);
        const updatedVouchers = await getAllVouchers(searchPattern);
        setVouchers(updatedVouchers);
    };

    const handleCreate = async (newVoucher) => {
        await createVoucher1(newVoucher);
        setIsCreateModalOpen(false);
        const updatedVouchers = await getAllVouchers(searchPattern);
        setVouchers(updatedVouchers);
    };

    const data = React.useMemo(() => {
        return vouchers.map((voucher, index) => ({
            number: index + 1,
            id: voucher.id,
            code: voucher.code,
            discountPercentage: voucher.discountPercentage,
            maxDiscountValue: voucher.maxDiscountValue,
            minOrderValue: voucher.minOrderValue,
            discountValue: voucher.discountValue,
            expiryDate: voucher.expiryDate ? new Date(voucher.expiryDate).toLocaleDateString() : 'N/A',
            used: voucher.used ? 'Yes' : 'No',
            userId: voucher.userId,
        }));
    }, [vouchers]);

    const columns = React.useMemo(() => [
        { Header: 'Number', accessor: 'number' },
        { Header: 'ID', accessor: 'id' },
        { Header: 'Code', accessor: 'code' },
        { Header: 'Discount Percentage', accessor: 'discountPercentage' },
        { Header: 'Max Discount Value', accessor: 'maxDiscountValue' },
        { Header: 'Min Order Value', accessor: 'minOrderValue' },
        { Header: 'Discount Value', accessor: 'discountValue' },
        { Header: 'Expiry Date', accessor: 'expiryDate' },
        { Header: 'Used', accessor: 'used' },
        { Header: 'User ID', accessor: 'userId' },
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
        setSelectedVoucher(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Vouchers</h2>
                <button className="new-voucher-button" onClick={() => setIsCreateModalOpen(true)}>Create New Voucher</button>
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
                                        onClick={() => setSelectedVoucher(row.original)}
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
                                {selectedVoucher.id && <p><strong>ID:</strong> {selectedVoucher.id}</p>}
                                {selectedVoucher.code && <p><strong>Code:</strong> {selectedVoucher.code}</p>}
                                {selectedVoucher.discountPercentage !== null && <p><strong>Discount Percentage:</strong> {selectedVoucher.discountPercentage}</p>}
                                {selectedVoucher.maxDiscountValue !== null && <p><strong>Max Discount Value:</strong> {selectedVoucher.maxDiscountValue}</p>}
                                {selectedVoucher.minOrderValue !== null && <p><strong>Min Order Value:</strong> {selectedVoucher.minOrderValue}</p>}
                                {selectedVoucher.discountValue !== null && <p><strong>Discount Value:</strong> {selectedVoucher.discountValue}</p>}
                                {selectedVoucher.expiryDate && <p><strong>Expiry Date:</strong> {selectedVoucher.expiryDate}</p>}
                                {selectedVoucher.used !== null && <p><strong>Used:</strong> {selectedVoucher.used}</p>}
                                {selectedVoucher.userId && <p><strong>User ID:</strong> {selectedVoucher.userId}</p>}
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
                                <h3>Edit Voucher</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <label>Code:</label>
                                <input
                                    type="text"
                                    value={editVoucher.code}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, code: e.target.value })}
                                />
                                <label>Discount Percentage:</label>
                                <input
                                    type="number"
                                    value={editVoucher.discountPercentage}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, discountPercentage: e.target.value })}
                                />
                                <label>Max Discount Value:</label>
                                <input
                                    type="number"
                                    value={editVoucher.maxDiscountValue}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, maxDiscountValue: e.target.value })}
                                />
                                <label>Min Order Value:</label>
                                <input
                                    type="number"
                                    value={editVoucher.minOrderValue}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, minOrderValue: e.target.value })}
                                />
                                <label>Discount Value:</label>
                                <input
                                    type="number"
                                    value={editVoucher.discountValue}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, discountValue: e.target.value })}
                                />
                                <label>Expiry Date:</label>
                                <input
                                    type="date"
                                    value={editVoucher.expiryDate}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, expiryDate: e.target.value })}
                                />
                                <div>
                                    <label>Used:</label>
                                    <select
                                        value={editVoucher.used}
                                        onChange={(e) => setEditVoucher({ ...editVoucher, used: e.target.value })}
                                    >
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <label>User ID:</label>
                                <input
                                    type="text"
                                    value={editVoucher.userId}
                                    onChange={(e) => setEditVoucher({ ...editVoucher, userId: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleSave} className="submit-button">Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {isCreateModalOpen && (
                    <CreateVoucherModal
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

export default connect(mapStateToProps, mapDispatchToProps)(Voucher);

const CreateVoucherModal = ({ onClose, onCreate }) => {
    const [code, setCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [maxDiscountValue, setMaxDiscountValue] = useState('');
    const [minOrderValue, setMinOrderValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [used, setUsed] = useState('false');
    const [userId, setUserId] = useState('');

    const handleSubmit = () => {
        onCreate({
            code,
            discountPercentage: parseFloat(discountPercentage),
            maxDiscountValue: parseInt(maxDiscountValue, 10),
            minOrderValue: parseInt(minOrderValue, 10),
            discountValue: parseInt(discountValue, 10),
            expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,
            used: used === 'true',
            userId,
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Create New Voucher</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-content">
                    <label>Code:</label>
                    <input
                        type="text"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <label>Discount Percentage:</label>
                    <input
                        type="number"
                        placeholder="Discount Percentage"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                    />
                    <label>Max Discount Value:</label>
                    <input
                        type="number"
                        placeholder="Max Discount Value"
                        value={maxDiscountValue}
                        onChange={(e) => setMaxDiscountValue(e.target.value)}
                    />
                    <label>Min Order Value:</label>
                    <input
                        type="number"
                        placeholder="Min Order Value"
                        value={minOrderValue}
                        onChange={(e) => setMinOrderValue(e.target.value)}
                    />
                    <label>Discount Value:</label>
                    <input
                        type="number"
                        placeholder="Discount Value"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                    />
                    <label>Expiry Date:</label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    <label>Used:</label>
                    <select value={used} onChange={(e) => setUsed(e.target.value)}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    <label>User ID:</label>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button onClick={handleSubmit} className="submit-button">Create</button>
                </div>
            </div>
        </div>
    );
};
