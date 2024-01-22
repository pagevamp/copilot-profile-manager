import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import './table.css';
import { useMemo, useState } from 'react';
import { ClientCellRenderer } from './cellRenderers/ClientCellRenderer';
import { CompanyCellRenderer } from './cellRenderers/CompanyCellRenderer';
import { HistoryCellRenderer } from './cellRenderers/HistoryCellRenderer';
import { useAppState } from '@/hooks/useAppState';

export const TableCore = () => {
  const appState = useAppState();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any>([
    {
      Client: { image: 'https://robohash.org/stefan-one', name: 'Tesla', email: 'tesla@gmail.com', id: 1 },
      company: { image: 'https://robohash.org/generate', name: 'Chase' },
      'Last updated': '1m',
      'Phone number': { value: '1928366444', showDot: true },
      Address: 'Texas',
      Hobby: 'Music',
    },
    {
      Client: { image: 'https://robohash.org/stefan-eleven', name: 'Wongchi', email: 'wongchi@gmail.com', id: 2 },
      company: { image: 'https://robohash.org/generate', name: 'Amazon' },
      'Last updated': '1d',
      'Phone number': { value: '9283774466', showDot: false },
      Address: '',
      Hobby: 'Dance',
    },
    {
      Client: { image: 'https://robohash.org/stefan-hundred', name: 'Holyland', email: 'holyland@gmail.com', id: 3 },
      company: { image: 'https://robohash.org/generate', name: 'Walt Disney Co.' },
      'Last updated': '',
      'Phone number': { value: '2883743322', showDot: true },
      Address: 'New York',
      Hobby: 'Flying',
    },
    {
      Client: { image: 'https://robohash.org/stefan-five', name: 'Nokia', email: 'nokia@gmail.com', id: 4 },
      company: { image: 'https://robohash.org/generate', name: 'Scrappy' },
      'Last updated': '2d',
      'Phone number': { value: '9182663344', showDot: true },
      Address: 'Hongkong',
      Hobby: '',
    },
    {
      Client: { image: 'https://robohash.org/stefan-four', name: 'Prolink', email: 'prolink@gmail.com', id: 5 },
      company: { image: 'https://robohash.org/generate', name: 'Facebook' },
      'Last updated': '1 month',
      'Phone number': { value: '', showDot: false },
      Address: 'Manila',
      Hobby: 'Diving',
    },
    {
      Client: { image: 'https://robohash.org/stefan-three', name: 'Apple', email: 'apple@gmail.com', id: 6 },
      company: { image: 'https://robohash.org/generate', name: 'Catch' },
      'Last updated': '12 hours',
      'Phone number': { value: '3847228833', showDot: false },
      Address: 'Kathmandu',
      Hobby: 'Music',
      chobby: 'Music',
    },
  ]);

  const comparator = (valueA: any, valueB: any) => {
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }

    return 0; // names are equal
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<any>([
    {
      field: 'Client',
      cellRenderer: ClientCellRenderer,
      flex: 1,
      comparator,
      valueGetter: (params: any) => {
        const client = params.data.Client;
        return `${client.image} ${client.name} ${client.email}`;
      },
    },
    {
      field: 'company',
      cellRenderer: CompanyCellRenderer,
      flex: 1,
      comparator,
      valueGetter: (params: any) => {
        const company = params.data.company;
        return `${company.image} ${company.name}`;
      },
    },
    { field: 'Last updated', flex: 1 },
    {
      field: 'Phone number',
      flex: 1,
      cellRenderer: HistoryCellRenderer,
      valueGetter: (params: any) => {
        const phoneProps = params.data['Phone number'];
        return `${phoneProps.value} ${phoneProps.showDot}`;
      },
    },
    { field: 'Address', flex: 1 },
    { field: 'Hobby', flex: 1 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      minWidth: 200,
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
        quickFilterText={appState?.searchKeyword}
      />
    </Box>
  );
};
