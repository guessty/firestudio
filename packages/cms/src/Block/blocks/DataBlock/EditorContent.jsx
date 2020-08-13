import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

export default class RichTextEditor extends PureComponent {
  static propTypes = {
    json: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape()),
      schema: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        type: PropTypes.string,
      })),
    }),
    onSetWorkingJson: PropTypes.func.isRequired,
  };

  static defaultProps = {
    json: {
      data: [],
      schema: [],
    },
  };

  gridApi;

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.gridApi) {
      this.gridApi.destroy();
      this.gridApi = undefined;
      this.columnApi = undefined;
    }
  }

  handleResize = () => {
    setTimeout(() => {
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit();
      }
    }, 0);
  };

  handleGridReady = async (params) => {
    const { api: gridApi, columnApi } = params;
    this.gridApi = gridApi;
    this.columnApi = columnApi;

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  render() {
    const { json } = this.props;
    const columnDefs = (json?.schema || []).map(item => ({
      headerName: item.key,
    }))
    const rowData = json?.data || [];

    return (
      <div className="flex flex-row flex-grow w-full h-full relative">
        <div className="flex flex-col flex-grow">
        <AgGridReact
            key="table-normal"
            ensureDomOrder
            suppressColumnVirtualisation
            suppressPropertyNamesCheck
            className="flex flex-col flex-grow"
            columnDefs={columnDefs}
            defaultColDef={{
              sortingOrder: ['asc', 'desc'],
              lockPosition: true,
              resizable: true,
              sortable: true,
            }}
            domLayout="autoHeight"
            headerHeight={40}
            rowData={rowData}
            rowHeight={40}
            onGridReady={this.handleGridReady}
          />
        </div>
      </div>
    );
  }
}
