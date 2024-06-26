import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
// import '../style/scoreboard.css';
import { getAllMaxScores } from '../../api/database';

const Scoreboard = ({ dispatchDisplay }) => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            const scoreList = await getAllMaxScores();
            setScores(scoreList);
        };

        fetchScores();
    }, []);

    const data = React.useMemo(() => scores, [scores]);

    const columns = React.useMemo(() => [
        { Header: 'User ID', accessor: 'userId' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Max Score', accessor: 'maxScore' },
        { Header: 'Achieved At', accessor: 'achievedAt', Cell: ({ value }) => new Date(value).toLocaleDateString() },
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h2 style={styles.title}>Scoreboards</h2>
                <div style={styles.tableContainer}>
                    <table {...getTableProps()} style={styles.table}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} style={styles.header}>
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
                                    <tr {...row.getRowProps()} style={styles.row}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} style={styles.cell}>
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        width: '80%',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    content: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        margin: '10px 0',
        color: '#333',
        fontSize: '24px',
    },
    tableContainer: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxHeight: '400px',
        overflowY: 'auto',
        width: '100%',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    header: {
        borderBottom: '2px solid #ddd',
        padding: '10px',
        textAlign: 'left',
        backgroundColor: '#f4f4f4',
        color: '#333',
    },
    cell: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#fff',
    },
    row: {
        '&:nthChild(even)': {
            backgroundColor: '#f9f9f9',
        },
    },
};

const dispatchDisplay = (displayTypeStr) => {
    return (dispatch) => {
        dispatch({ type: displayTypeStr });
    };
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = { dispatchDisplay };

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
