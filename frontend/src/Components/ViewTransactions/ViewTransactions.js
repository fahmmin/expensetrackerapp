import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'amount', headerName: 'Amount', width: 130, renderCell: (params) => (
        <span style={{ color: params.row.type === 'expense' ? 'red' : 'var(--color-green)' }}>
            {params.row.type === 'expense' ? `-${params.value <= 0 ? 0 : params.value}` : `+${params.value <= 0 ? 0 : params.value}`}
        </span>
    )},
    { field: 'type', headerName: 'Type', width: 90 },
    { field: 'category', headerName: 'Category', width: 130 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Nxt() {
    const { transactionHistory } = useGlobalContext();
    const [rows, setRows] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const history = transactionHistory();
        const transformedRows = history.map((item) => ({
            id: item._id,
            title: item.title,
            amount: item.amount,
            type: item.type,
            category: item.category,
        }));
        setRows(transformedRows);

        // Extract categories and their counts
        const categoryCounts = history.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});

        const categoryData = Object.keys(categoryCounts).map((key, index) => ({
            id: index,
            value: categoryCounts[key],
            label: key,
        }));

        setCategoryData(categoryData);
    }, [transactionHistory]);

    return (
        <TransactionsStyled>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
  background-color: black !important; /* Force background to black */
  color: white; /* Ensure text is white */
  height: 100vh; /* Ensure it covers the full height */
  padding: 2rem;
  /* Add other styles as needed */
`;
