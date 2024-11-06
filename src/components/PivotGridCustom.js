import React, { Component, Fragment } from 'react';
import Chart, {
    AdaptiveLayout,
    CommonSeriesSettings,
    Size,
    Tooltip
} from 'devextreme-react/chart';

import PivotGrid, {
    FieldChooser, Export
} from 'devextreme-react/pivot-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';



export default class PivotGridCustom extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <PivotGrid
                    id="pivotgrid"
                    dataSource={this.props.url ? this.props.url : this.props.data}
                    allowSortingBySummary={true}
                    allowFiltering={true}
                    showBorders={true}
                    showColumnTotals={false}
                    showColumnGrandTotals={false}
                    showRowTotals={false}
                    showRowGrandTotals={false}
                >
                    <FieldChooser enabled={true} height={400}  allowSearch={true}/>
                    {/* <Export enabled={true} fileName="Sales" /> */}
                </PivotGrid>
            </React.Fragment>
        );
    }
}
