import React, {Component, Fragment} from 'react';
import DataGrid, {
    SearchPanel,
    Column,
    FilterRow,
    Paging,
    Pager,
    Editing,
    Selection,
    GroupPanel, Grouping, ColumnFixing, RemoteOperations
} from 'devextreme-react/data-grid';


export default class DevExpressCustom extends Component {

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
        const {allMode, checkBoxesMode} = this.state;
        return (
            <DataGrid
                // id={'gridContainer'}
                dataSource={this.props.url ? this.props.url : this.props.data }
                showBorders={true}
                onRowValidating={this.onRowValidating}
                onEditorPreparing={this.onEditorPreparing}
                columnAutoWidth={true}
                onContentReady={this.onContentReady}
                onRowClick={this.props.onRow}
                // remoteOperations={this.props.remoteOperations}
            >
                <RemoteOperations paging={this.props.paging}/>
                <ColumnFixing enabled={true} />
                <Editing
                    mode={'row'}
                    useIcons={true}
                    allowAdding={this.props.isAdd}
                    allowDeleting={this.props.isDelete}
                    allowUpdating={this.props.isEdit}
                />
                <Paging defaultPageSize={10} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 20]}
                    showInfo={true} />

                {/*<FilterRow visible={this.state.showFilterRow}*/}
                {/*           applyFilter={this.state.currentFilter}/>*/}
                <GroupPanel visible={true}/>
                <SearchPanel visible={true} highlightCaseSensitive={true}/>
                <Grouping autoExpandAll={false}/>
                {this.props.children}
                <Column type={'buttons'}
                        buttons={this.props.button}
                        alignment="center"/>

            </DataGrid>
        );
    }
}
