import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import JsonEditorContent from '../JsonBlock/EditorContent';

export default class EditorContent extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape()),
      gridConfig: PropTypes.shape({
        columnDefs: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
    onSetWorkingContent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content: {
      data: [],
      gridConfig: {
        columnDefs: [],
      },
    },
  };

  gridApi;

  state = {
    view: 'grid',
  };

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

  handleChangeView = (event) => {
    this.setState({
      view: event.target.value,
    })
  };

  renderRadios() {
    const { view } = this.state;

    return (
      <div>
        <input
          type="radio"
          value="grid"
          name="view"
          id="gridView"
          checked={view === 'grid'}
          onChange={this.handleChangeView}
        />
        <label htmlFor="gridView">Grid</label>
        <input
          type="radio"
          value="json"
          name="view"
          id="jsonView"
          checked={view === 'json'}
          onChange={this.handleChangeView}
        />
        <label htmlFor="jsonView">JSON</label>
      </div>
    );
  }

  render() {
    const { view } = this.state;
    const { content } = this.props;
    const columnDefs = content?.gridConfig?.columnDefs || [];
    const rowData = content?.data || [];

    return (
      <div className="flex flex-col flex-grow overflow-hidden">
        {this.renderRadios()}
        {view === 'grid' && (
          <div className="flex flex-row flex-grow w-full h-full relative">
            <div className="flex flex-col flex-grow">
              <AgGridReact
                key="datagrid"
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
                headerHeight={40}
                rowData={rowData}
                rowHeight={40}
                onGridReady={this.handleGridReady}
              />
            </div>
          </div>
        )}
        {view === 'json' && (
          <JsonEditorContent {...this.props} />
        )}
      </div>
    );
  }
}
