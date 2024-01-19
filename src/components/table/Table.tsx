import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import './table.css';
import { useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export const TableCore = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<any>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'electric' },
    { field: 'plastic' },
    { field: 'cars' },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
    };
  }, []);

  return (
    <Box
      className="ag-theme-quartz"
      sx={{ height: { xs: '90vh', sm: 'calc(100% - 71px)' }, padding: { xs: 0, sm: '24px 24px 0 24px' } }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} suppressMovableColumns={true} />
    </Box>
  );
};
