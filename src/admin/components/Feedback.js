import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import '../style/feedback.css';
import { getAllFeedback, updateFeedbackResponse } from '../../api/database';

const Feedback = ({ dispatchDisplay, searchPattern }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const feedbackList = await getAllFeedback(searchPattern);
            if (feedbackList === null) {
                feedbackList = [];
            }
            setFeedbacks(feedbackList);
        };

        fetchFeedbacks();
    }, [searchPattern]);

    const handleReply = async () => {
        await updateFeedbackResponse(selectedFeedback.id, replyMessage);
        setIsReplyModalOpen(false);
        setSelectedFeedback(null);
        setReplyMessage('');
        // Fetch updated feedback list
        const updatedFeedbacks = await getAllFeedback(searchPattern);
        setFeedbacks(updatedFeedbacks);
    };

    const data = React.useMemo(() => {
        return feedbacks.map((feedback, index) => {
            const feedbackData = {
                number: index + 1,
                id: feedback.id,
                message: feedback.message,
                response: feedback.response || 'No response yet',
                createdAt: new Date(feedback.createdAt).toLocaleString(),
                userName: feedback.user.name,
            };
            return feedbackData;
        });
    }, [feedbacks]);

    const columns = React.useMemo(() => {
        const cols = [
            { Header: 'Number', accessor: 'number' },
            { Header: 'ID', accessor: 'id' },
            { Header: 'User Name', accessor: 'userName'},
            { Header: 'Message', accessor: 'message' },
            { Header: 'Response', accessor: 'response' },
            { Header: 'Created At', accessor: 'createdAt' },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFeedback(row.original);
                                setIsReplyModalOpen(true);
                            }}
                        >
                                Reply
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
        setSelectedFeedback(null);
    };

    return (
        <div className="container">
            <div className="content">
                <h2 className="title">Feedbacks</h2>
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
                                        onClick={() => setSelectedFeedback(row.original)}
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
                {selectedFeedback && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Feedback Details</h3>
                                <button onClick={closeModal} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <p><strong>Number:</strong> {selectedFeedback.number}</p>
                                {selectedFeedback.id && <p><strong>ID:</strong> {selectedFeedback.id}</p>}
                                {selectedFeedback.message && <p><strong>Message:</strong> {selectedFeedback.message}</p>}
                                {selectedFeedback.response && <p><strong>Response:</strong> {selectedFeedback.response}</p>}
                                {selectedFeedback.createdAt && <p><strong>Created At:</strong> {selectedFeedback.createdAt}</p>}
                            </div>
                            <div className="modal-footer">
                                <button onClick={closeModal} className="close-button">Close</button>
                            </div>
                        </div>
                    </div>
                )}
                {isReplyModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-header">
                                <h3>Reply to Feedback</h3>
                                <button onClick={() => setIsReplyModalOpen(false)} className="close-button">×</button>
                            </div>
                            <div className="modal-content">
                                <label>Response:</label>
                                <textarea
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleReply} className="submit-button">Send Reply</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
