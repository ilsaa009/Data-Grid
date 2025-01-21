

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import Typography from '@mui/material/Typography';

const TreeDataGrid: React.FC = () => {
  const treeData = [
    { id: 1, name: 'Root', parent: null },
    { id: 2, name: 'Child 1', parent: 1 },
    { id: 3, name: 'Child 2', parent: 1 },
    { id: 4, name: 'Grandchild 1', parent: 2 },
    { id: 5, name: 'Grandchild 2', parent: 2 },
    { id: 6, name: 'Grandchild 3', parent: 3 },
  ];

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
  ];

  const getTreeDataPath = (row: any) => {
    const path = [];
    let currentRow = row;
    while (currentRow) {
      path.unshift(currentRow.name); 
      currentRow = treeData.find((row: any) => row.id === currentRow.parent);
    }
    return path;
  };

  return (
    <Box sx={{ width: '100%', padding: 2, backgroundColor: 'white', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Tree Data Grid Example
      </Typography>
      <Box sx={{ height: 400, border: '1px solid #ccc', borderRadius: 2 }}>
        <DataGridPro
          rows={treeData}
          columns={columns}
          getTreeDataPath={getTreeDataPath} 
          treeData
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default TreeDataGrid;
