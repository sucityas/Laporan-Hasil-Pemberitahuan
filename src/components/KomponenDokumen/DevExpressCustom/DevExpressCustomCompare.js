import React, { Component } from "react";
import DataGrid, {
  Paging,
  Pager,
  FilterRow,
  Editing,
  Grouping,
} from "devextreme-react/data-grid";

export default class DevExpressCustomTested extends Component {
  constructor(props) {
    super(props);
    this.applyFilterTypes = [
      { key: "auto", name: "Immediately" },
      { key: "onClick", name: "On Button Click" }
    ];
    this.state = {
      collapsed: false,
      rows: props.rows,
      allMode: "allPages",
      checkBoxesMode: "onClick",
      showHeaderFilter: true,
      currentFilter: this.applyFilterTypes[0].key
    };
  }

  render() {
    return (
      <DataGrid
        dataSource={this.props.data}
        showBorders={true}
        onRowValidating={this.onRowValidating}
        onEditorPreparing={this.onEditorPreparing}
        onContentReady={this.onContentReady}
        columnAutoWidth={true}
        onRowClick={data => this.props.onRowData && this.props.onRowData(data)}
        hoverStateEnabled={true}
      >
        <Editing
          mode={"row"}
          useIcons={true}
          allowAdding={this.props.isAdd}
          allowDeleting={this.props.isDelete}
          allowUpdating={this.props.isEdit}
        />
        <FilterRow applyFilter={this.state.currentFilter} visible={true} />
        {this.props.children}
        <Grouping autoExpandAll={false} />
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10]} />
      </DataGrid>
    );
  }
}
