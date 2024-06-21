import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/score.css';
import { getAllScores, deleteScore, updateScore1, createScore } from '../../api/database';

const Score = ({ dispatchDisplay, searchPattern }) => {
    const [scores, setScores] = useState([]);
    const [selectedScore, setSelectedScore] = useState(null);
    const [editScore, setEditScore] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedScoreId, setSelectedScoreId] = useState(null);

    useEffect(() => {
        const fetchScores = async () => {
            const scoreList = await getAllScores(searchPattern);
            if (scoreList === null) {
                scoreList = [];
            }
            setScores(scoreList);
        };

        fetchScores();
    }, [searchPattern]);

    const handleDelete = async (id) => {
        await deleteScore(id);
        setScores(scores.filter(score => score.id !== id));
        const updatedScores = await getAllScores(searchPattern);
        setScores(updatedScores);

    };

    const handleEdit = (score) => {
        setSelectedScoreId(score.id);
        setEditScore(score);
        setIsEditModalOpen(true);
    };

    const handleSave = async () => {
        setEditScore({ ...editScore, id: selectedScoreId });
        console.log(editScore);
        await updateScore1(editScore);
        setIsEditModalOpen(false);
        setSelectedScoreId(null);
        setEditScore(null);
        const updatedScores = await getAllScores(searchPattern);
        setScores(updatedScores);
    };

    const handleCreate = async (newScore) => {
        await createScore(newScore);
        setIsCreateModalOpen(false);
        const updatedScores = await getAllScores(searchPattern);
        setScores(updatedScores);
    };

    const data = React.useMemo(() => {
        return scores.map((score, index) => ({
            number: index + 1,
            id: score.id,
            score: score.score,
            userId: score.userId,
            createdAt: new Date(score.createdAt).toLocaleDateString(),
            userName: score.user.name,
        }));
    }, [scores]);

    const columns = React.useMemo(() => [
        { Header: 'Number', accessor: 'number' },
        { Header: 'ID', accessor: 'id' },
        { Header: 'Score', accessor: 'score' },
        { Header: 'User ID', accessor: 'userId' },
        { Header: 'User Name', accessor: 'userName'},
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
        setSelectedScore(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Scores</h2>
                <button className="new-score-button" onClick={() => setIsCreateModalOpen(true)}>Create New Score</button>
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
                                        onClick={() => setSelectedScore(row.original)}
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
                {selectedScore && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Score Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                {selectedScore.id && <p><strong>ID:</strong> {selectedScore.id}</p>}
                                {selectedScore.score && <p><strong>Score:</strong> {selectedScore.score}</p>}
                                {selectedScore.userId && <p><strong>User ID:</strong> {selectedScore.userId}</p>}
                                {selectedScore.createdAt && <p><strong>Created At:</strong> {selectedScore.createdAt}</p>}
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
                                <h3>Edit Score</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <label>Score:</label>
                                <input
                                    type="number"
                                    value={editScore.score}
                                    onChange={(e) => setEditScore({ ...editScore, score: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleSave} className="submit-button">Save</button>
                            </div>
                        </div>
                    </div>
                )}
                {isCreateModalOpen && (
                    <CreateScoreModal
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

export default connect(mapStateToProps, mapDispatchToProps)(Score);

const CreateScoreModal = ({ onClose, onCreate }) => {
    const [score, setScore] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = () => {
        onCreate({
            score: parseInt(score, 10),
            userId,
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Create New Score</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-content">
                    <label>Score:</label>
                    <input
                        type="number"
                        placeholder="Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
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
