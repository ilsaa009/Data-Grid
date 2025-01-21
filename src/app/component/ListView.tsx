import * as React from 'react';
import { DataGridPro, GridColDef, GridRowsProp, GridPaginationModel } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { Paper, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'age', headerName: 'Age', width: 120 },
  { field: 'jobTitle', headerName: 'Job Title', width: 180 },
];

const ListView = () => {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });
  const [totalCount, setTotalCount] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const response = await axios.get('/api/data', {
        params: {
          page,
          pageSize,
        },
      });
      const data = response.data;

      setRows(data.rows);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  React.useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  const handlePageChange = (newPage: number) => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      page: newPage,
    }));
  };


  const toggleView = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

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
        <Button variant="contained" onClick={toggleView} sx={{ marginBottom: 2 }}>
          Toggle {viewMode === 'grid' ? 'List' : 'Grid'} View
        </Button>

        {viewMode === 'grid' ? (
          <DataGridPro
            rows={rows}
            columns={columns}
            rowCount={totalCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel} // Unified pagination model handler
            loading={rows.length === 0}
            pageSizeOptions={[5, 10, 25]} // Optional: allow page size selection
            sx={{
              boxShadow: 2,
              borderRadius: 1,
              backgroundColor: '#ffffff',
            }}
          />
        ) : (
          <List>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <ListItem>
                  <ListItemText
                    primary={`${row.name} - ${row.jobTitle}`}
                    secondary={`Age: ${row.age}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default ListView;
