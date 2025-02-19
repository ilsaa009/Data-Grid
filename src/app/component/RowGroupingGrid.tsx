import * as React from 'react';
import { DataGridPro, GridColDef, GridRowsProp, GridPaginationModel } from '@mui/x-data-grid-pro';
import { Box, Paper } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'department', headerName: 'Department', width: 180 },
  { field: 'jobTitle', headerName: 'Job Title', width: 180 },
  { field: 'salary', headerName: 'Salary', width: 180, type: 'number' },
];

const rows: GridRowsProp = [
  { id: 1, name: 'Alice', department: 'Sales', jobTitle: 'Sales Manager', salary: 100000 },
  { id: 2, name: 'Bob', department: 'Engineering', jobTitle: 'Software Engineer', salary: 120000 },
  { id: 3, name: 'Charlie', department: 'Sales', jobTitle: 'Sales Representative', salary: 80000 },
  { id: 4, name: 'David', department: 'Engineering', jobTitle: 'Frontend Developer', salary: 110000 },
  { id: 5, name: 'Eve', department: 'HR', jobTitle: 'HR Manager', salary: 95000 },
];

const RowGroupingGrid = () => {
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        sx={{
          width: '90%',
          maxWidth: 1200,
          backgroundColor: '#ffffff',
          boxShadow: 3,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <DataGridPro
          rows={rows}
          columns={columns}
          rowCount={rows.length}
          paginationMode="server" // Server pagination if data is fetched from server
          paginationModel={paginationModel} // Use paginationModel state
          onPaginationModelChange={setPaginationModel} // Handle pagination model changes
          pageSizeOptions={[5, 10, 25]} // Customize page size options
          sx={{
            boxShadow: 2,
            borderRadius: 1,
            backgroundColor: '#ffffff',
          }}
        />
      </Paper>
    </Box>
  );
};

export default RowGroupingGrid;
