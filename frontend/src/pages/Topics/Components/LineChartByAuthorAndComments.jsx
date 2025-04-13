import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { geAuthorWithTopic } from '../../../provider/GeneralFunctionsProcessed';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const LineChartByAuthorAndComments = ({ topic }) => {


    const _geAuthorWithTopic = geAuthorWithTopic(topic);

    const sortedData = Object.entries(_geAuthorWithTopic)
        .sort(([, valueA], [, valueB]) => valueB - valueA)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {})

    const formattedSeriesDataKey = [...Object.keys(sortedData)].slice(0, 20);
    const formattedSeriesDataValue = [...Object.values(sortedData)].slice(0, 20);

    const data = {

        labels: [...formattedSeriesDataKey],
        datasets: [
            {
                label: "Author Analytics",
                fill: true,
                lineTension: 0.5,
                backgroundColor: 'rgba(85, 110, 230, 0.2)',
                borderColor: '#556ee6',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#556ee6',
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#556ee6',
                pointHoverBorderColor: "#fff",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [...formattedSeriesDataValue]
            }
        ]
    }
    const option = {
        x: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        y: {
            ticks: {
                font: {
                    family: 'Poppins',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: 'Poppins',
                    }
                }
            },
        },
    }
    return (

        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-2">Line Chart Analytics</h4>
                    <div id="line-column-chart" className="apex-charts" dir="ltr">
                        <Line width={724} height={270} data={data} options={option} />
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default LineChartByAuthorAndComments;


