'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DataGridPro,
  useGridApiRef,
  gridVisibleColumnDefinitionsSelector,
  gridExpandedSortedRowIdsSelector,
  GridCellParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';

const ScrollRestoration: React.FC = () => {
  const apiRef = useGridApiRef();

  const [coordinates, setCoordinates] = React.useState({
    rowIndex: 0,
    colIndex: 0,
  });

  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
  });

  React.useEffect(() => {
    const { rowIndex, colIndex } = coordinates;
    apiRef.current.scrollToIndexes(coordinates);
    const id = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex];
    const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
    apiRef.current.setCellFocus(id, column.field);
  }, [apiRef, coordinates]);

  const handleCellClick = (params: GridCellParams) => {
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).findIndex(
      (id) => id === params.id,
    );
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
      (column) => column.field === params.field,
    );
    setCoordinates({ rowIndex, colIndex });
  };

  return (
    <Box sx={{ width: '100%', padding: 2, backgroundColor: 'white', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Scroll Restoration Demo
      </Typography>
      <Box sx={{ height: 400, border: '1px solid #ccc', borderRadius: 2 }}>
        <DataGridPro
          apiRef={apiRef}
          onCellClick={handleCellClick}
          hideFooter
          loading={loading}
          {...data}
          initialState={{
            ...data.initialState,
            scroll: { top: 1000, left: 1000 },
          }}
        />
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
        Click on any cell to update scroll position and focus.
      </Typography>
    </Box>
  );
};

export default ScrollRestoration;
