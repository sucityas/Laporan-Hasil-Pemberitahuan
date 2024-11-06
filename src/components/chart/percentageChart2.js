import React, { Component, Fragment } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

export default class percentageChart2 extends Component {
  render() {
    return (
      <Fragment>
        <Pie
          ref="chart"
          data={{
            labels: [
              "07:30-10:10",
              "10:01-11:00",
              "11:01-15:00",
              "15:01-17:00",
              "< = 1 Jam",
              "> 1 Jam",
              "> 2 Jam"
            ],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: [
                  "#FFDF00", // kuning
                  "blueviolet", // ungu
                  "lightcoral" //merah pudar
                ],
                borderColor: 'white',
                // borderColor: [
                //   "chartreuse", // green
                //   "deepskyblue", //biru
                //   "orange", // orange
                //   "red", //red
                //   "rgba(251, 255, 0, 0.4)", // kuning
                //   "rgba(174, 0, 255, 0.4)", // ungu
                //   "rgba(236, 48, 105, 0.4)" //merah pudar
                // ],
                // data: ["0", "0", "0", "0", "173", "212", "318"] 
                data: this.props.data
                //rubah state disini
              }
            ]
          }}
          legend={false}
          options={{
            plugins: {
              datalabels: {
                formatter: (value, ctx) => {
                  let datasets = ctx.chart.data.datasets;

                  if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                    let sum = datasets[0].data.reduce(
                      (a, b) => parseInt(a) + parseInt(b),
                      0
                    );
                    let percentage = Math.round((value / sum) * 100) + "%";
                    if (value === 0 || value === '0') {
                        return null
                    } else {
                        return percentage + ` (${value})`;
                    }
                  } else {
                    return value;
                  }
                },
                color: 'black'
              }
            }
          }}
        />
      </Fragment>
    );
  }
}
