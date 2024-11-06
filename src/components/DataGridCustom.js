import React, { Component, Fragment } from 'react';
import DataGrid, {
    SearchPanel,
    Column,
    FilterRow,
    HeaderFilter,
    FilterPanel,
    FilterBuilderPopup,
    Paging,
    Pager,
    Editing,
    Selection,
    GroupPanel, Grouping,
    ColumnChooser,
    ColumnFixing,
    CompareRule,
    Export,
    Lookup,
    PatternRule,
    Popup,
    Position,
    RangeRule,
    Sorting
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';


const filterBuilderPopupPosition = {
    of: window,
    at: 'top',
    my: 'top',
    offset: { y: 10 }
  };

export default class DataGridCustom extends Component {

    constructor(props) {
        super(props);
        this.applyFilterTypes = [{
            key: 'auto',
            name: 'Immediately'
        }, {
            key: 'onClick',
            name: 'On Button Click'
        }];
        this.state = {
            collapsed: false,
            rows: props.rows,
            allMode: 'allPages',
            checkBoxesMode: 'onClick',
            showFilterRow: true,
            showHeaderFilter: true,
            currentFilter: this.applyFilterTypes[0].key
        };

        this.loopColumn = this.loopColumn.bind(this);

    }

    loopColumn() {
        console.log(this.props.children);
    }


    render() {
        const { allMode, checkBoxesMode } = this.state;
        return (


            <DataGrid
                // id={'gridContainer'}
                dataSource={this.props.url ? this.props.url : this.props.data}
                showBorders={true}
                showRowLines={true}
                onRowValidating={this.onRowValidating}
                onEditorPreparing={this.onEditorPreparing}
                columnAutoWidth={true}
                onContentReady={this.onContentReady}
                onRowClick={this.props.onRow}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
            >
                <Export enabled={true} fileName={this.props.fileName} />
                <Paging defaultPageSize={10} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 20]}
                    showInfo={true} />

                <FilterRow visible={this.state.showFilterRow}
                    applyFilter={this.state.currentFilter} />
                <HeaderFilter visible={this.state.showHeaderFilter} />
                <FilterPanel visible={true} />
                <FilterBuilderPopup position={filterBuilderPopupPosition} />
                <GroupPanel visible={true} />
                <SearchPanel visible={true} highlightCaseSensitive={true} />
                <Grouping autoExpandAll={false} />
                {this.props.children}
                <ColumnChooser enabled={true} />
                <Sorting mode="multiple" />
            </DataGrid>

        );
    }
}
