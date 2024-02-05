import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import './table.css';
import { useEffect, useMemo, useState } from 'react';
import { ClientCellRenderer } from './cellRenderers/ClientCellRenderer';
import { CompanyCellRenderer } from './cellRenderers/CompanyCellRenderer';
import { HistoryCellRenderer } from './cellRenderers/HistoryCellRenderer';
import { useAppState } from '@/hooks/useAppState';
import { getTimeAgo } from '@/utils/getTimeAgo';
import { arraysHaveSameElements } from '@/utils/arrayHaveSameElements';

export const TableCore = () => {
  const appState = useAppState();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<any>([]);
  //
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<any>([]);

  const comparatorTypeI = (valueA: any, valueB: any) => {
    if (valueA.name < valueB.name) {
      return -1;
    }
    if (valueA.name > valueB.name) {
      return 1;
    }

    return 0;
  };

  const comparatorTypeII = (valueA: any, valueB: any) => {
    if (valueA.row[valueA.key].value < valueB.row[valueB.key].value) {
      return -1;
    }
    if (valueA.row[valueA.key].value > valueB.row[valueB.key].value) {
      return 1;
    }

    return 0;
  };

  useEffect(() => {
    setRowData(appState?.clientProfileUpdates);

    let colDefs: any = [];
    if (appState?.clientProfileUpdates.length && appState?.clientProfileUpdates.length) {
      const col = appState?.clientProfileUpdates[0];
      delete col.id;
      const keys = Object.keys(col);
      keys.map((el) => {
        if (el === 'client') {
          colDefs = [
            ...colDefs,
            {
              field: 'client',
              cellRenderer: ClientCellRenderer,
              flex: 1,
              comparator: comparatorTypeI,
              minWidth: 250,
              valueGetter: (params: any) => {
                const client = params.data[el];
                return {
                  avatarImageUrl: client.avatarImageUrl,
                  name: client.name,
                  email: client.email,
                };
              },
            },
          ];
          return;
        }
        if (el === 'company') {
          colDefs = [
            ...colDefs,
            {
              field: 'company',
              cellRenderer: CompanyCellRenderer,
              flex: 1,
              comparator: comparatorTypeI,
              valueGetter: (params: any) => {
                const company = params.data[el];
                return {
                  iconImageUrl: company.iconImageUrl,
                  name: company.name,
                };
              },
            },
          ];
          return;
        }
        if (el === 'lastUpdated') {
          colDefs = [
            ...colDefs,
            {
              field: 'lastUpdated',
              flex: 1,
              valueGetter: (params: any) => {
                const lastUpdated = params.data[el];
                return `${getTimeAgo(lastUpdated)} ago`;
              },
            },
          ];
          return;
        }

        colDefs = [
          ...colDefs,
          {
            field: el,
            flex: 1,
            sortable: col[el].type === 'multiSelect' ? false : true,
            comparator: comparatorTypeII,
            cellRenderer: HistoryCellRenderer,
            valueGetter: (params: any) => {
              return {
                row: params.data,
                key: el,
              };
            },
          },
        ];
      });
      setColDefs(colDefs);
    }
  }, [appState?.clientProfileUpdates]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: false,
      minWidth: 200,
    };
  }, []);

  return (
    <Box
      className="ag-theme-quartz"
      sx={{
        height:
          arraysHaveSameElements(appState?.mutableSettings, appState?.settings) &&
          JSON.stringify(appState?.customFieldAccess) === JSON.stringify(appState?.mutableCustomFieldAccess)
            ? '90vh'
            : '82vh',
        width: '100%',
        padding: { xs: 0, sm: '24px 24px 0 24px' },
      }}
    >
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
