import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import './table.css';
import { useMemo, useState } from 'react';
import { ClientCellRenderer } from './cellRenderers/ClientCellRenderer';
import { CompanyCellRenderer } from './cellRenderers/CompanyCellRenderer';

export const TableCore = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any>([
    {
      Client: { image: 'https://robohash.org/stefan-one', name: 'Tesla', email: 'tesla@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Chase' },
      'Last updated': '1m',
      'Phone number': '9283774466',
      Address: 'Texas',
      Hobby: 'Music',
    },
    {
      Client: { image: 'https://robohash.org/stefan-eleven', name: 'Wongchi', email: 'wongchi@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Amazon' },
      'Last updated': '1d',
      'Phone number': '1928366444',
      Address: '',
      Hobby: 'Dance',
    },
    {
      Client: { image: 'https://robohash.org/stefan-hundred', name: 'Holyland', email: 'holyland@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Walt Disney Co.' },
      'Last updated': '',
      'Phone number': '2883743322',
      Address: 'New York',
      Hobby: 'Flying',
    },
    {
      Client: { image: 'https://robohash.org/stefan-five', name: 'Nokia', email: 'nokia@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Scrappy' },
      'Last updated': '2d',
      'Phone number': '9182663344',
      Address: 'Hongkong',
      Hobby: '',
    },
    {
      Client: { image: 'https://robohash.org/stefan-four', name: 'Prolink', email: 'prolink@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Facebook' },
      'Last updated': '1 month',
      'Phone number': '',
      Address: 'Manila',
      Hobby: 'Diving',
    },
    {
      Client: { image: 'https://robohash.org/stefan-three', name: 'Apple', email: 'apple@gmail.com' },
      company: { image: 'https://robohash.org/generate', name: 'Catch' },
      'Last updated': '12 hours',
      'Phone number': '3847228833',
      Address: 'Kathmandu',
      Hobby: 'Music',
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<any>([
    { field: 'Client', cellRenderer: ClientCellRenderer },
    { field: 'company', cellRenderer: CompanyCellRenderer },
    { field: 'Last updated' },
    { field: 'Phone number' },
    { field: 'Address' },
    { field: 'Hobby' },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      width: 240,
    };
  }, []);

  return (
    <Box className="ag-theme-quartz" sx={{ height: '90vh', width: '100%', padding: { xs: 0, sm: '24px 24px 0 24px' } }}>
      <AgGridReact
        className="on-scroll"
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        suppressMovableColumns={true}
      />
    </Box>
  );
};
