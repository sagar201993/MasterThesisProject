import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import AllJsonData from '../../../assets/jsons/allData.json';
import { geAuthorWithCommentCount } from '../../../provider/GeneralFunctions';


const FunnelChartByAuthorAndComments = ({ topic }) => {
    const _geAuthorWithCommentCount = geAuthorWithCommentCount(AllJsonData, topic);

    const AuthorDataArray = Object.entries(_geAuthorWithCommentCount).map(([name, count]) => ({ name, count }));
    const authorWithCommentList = {};
    ((AuthorDataArray.sort((a, b) => b.count - a.count)).slice(0, 10)).forEach((entry) => {
        const author = entry.name;
        const commentCount = parseInt(entry.count, 10);

        if (!isNaN(commentCount)) {
            authorWithCommentList[author] = commentCount;
        }
    });

    const series = [{
        name: 'Comments',
        data: [...Object.values(authorWithCommentList)]
    }];

    const options = {
        chart: {
            toolbar: {
                show: true,
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                isFunnel: true,
            }
        },
        dataLabels: {
            enabled: true
        },
        legend: {
            show: true,
        },
        xaxis: {
            categories: [...Object.keys(authorWithCommentList)],
        }
    };


    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-2">Funnel Chart Analytics<small> [ Based on top authors overall] </small></h4>
                    <ReactApexChart options={options} series={series} type="bar" height="350" />
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default FunnelChartByAuthorAndComments;