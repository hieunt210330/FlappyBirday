import React from 'react';
import { useTable } from 'react-table';

const Scoreboard = () => {
    const data = React.useMemo(
        () => [
            { code: 'Voucher Code 1', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
            { code: 'Voucher Code 2', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
            { code: 'Voucher Code 3', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
            { code: 'Voucher Code 4', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
            { code: 'Voucher Code 5', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
            { code: 'Voucher Code 6', detail: 'Voucher Brief Info', date: 'DD/MM/YYYY' },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Scoreboard Code',
                accessor: 'code',
            },
            {
                Header: 'Detail',
                accessor: 'detail',
            },
            {
                Header: 'Date Received',
                accessor: 'date',
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

    return (
        <div>
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
                        <tbody {...getTableBodyProps()} style={styles.tbody}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
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
        width: '244px',
        margin: '20px auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-around',
        borderBottom: '1px solid #ccc',
    },
    tab: {
        flex: 1,
        padding: '10px 0',
        cursor: 'pointer',
        textAlign: 'center',
    },
    activeTab: {
        backgroundColor: '#dfeaff',
        fontWeight: 'bold',
    },
    inactiveTab: {
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        margin: '10px 0',
    },
    tableContainer: {
        maxHeight: '400px', // Adjust as needed
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
        color: '#f00',
    },
    cell: {
        borderBottom: '1px solid #ddd',
        padding: '10px',
    },
};

export default Scoreboard;
