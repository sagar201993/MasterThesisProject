import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Card, CardBody } from 'reactstrap';
import { geAuthorWithTopic } from '../../../provider/GeneralFunctionsProcessed';
import Chart from 'chart.js/auto';

import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const PolarAreaChartByAuthorAndComments = ({ topic }) => {

    const _geAuthorWithTopic = geAuthorWithTopic(topic);

    const sortedData = Object.entries(_geAuthorWithTopic)
        .sort(([, valueA], [, valueB]) => valueB - valueA)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {})


    const formattedSeriesDataKey = [...Object.keys(sortedData)].slice(0, 5);
    const formattedSeriesDataValue = [...Object.values(sortedData)].slice(0, 5);

    const data = {
        datasets: [{
            data: [...formattedSeriesDataValue],
            backgroundColor: [
                "#f46a6a",
                "#34c38f",
                "#f1b44c",
                "#556ee6"
            ],
            label: 'Comments', // for legend
            hoverBorderColor: "#fff"
        }],
        labels: [...formattedSeriesDataKey]
    };


    return (


        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-2">Polar Area Chart Analytics</h4>
                    <div id="line-column-chart" className="apex-charts" dir="ltr">
                        <PolarArea width={300} height={300} data={data} className="chartjs-render-monitor mx-auto" />
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );

}

export default PolarAreaChartByAuthorAndComments;