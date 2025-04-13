import React, { useState, useEffect } from 'react';
import { Card, CardBody, ButtonGroup } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import "../../Dashboard/dashboard.scss";

import { groupedByYearAndAuthorFilterByTopic } from '../../../provider/GeneralFunctionsProcessed';

const ByTopicCommentReports = ({ topic }) => {

    const [ChartToggleData, setChartToggleData] = useState(groupedByYearAndAuthorFilterByTopic(topic));

    const getTotalComments = (filteredData) => {
        const returnVal = Object.values(filteredData).reduce((acc, value) => acc + value, 0);
        return returnVal;
    };

    const percentageData = (filteredData) => Object.fromEntries(
        Object.entries(filteredData).sort((a, b) => b[1] - a[1]).map(([key, value]) => [key, parseFloat(((value / getTotalComments(filteredData)) * 100).toFixed(2))])
    );
    const percentageDataSpakChart = (filteredData) => Object.fromEntries(
        (Object.entries(filteredData).map(([key, value]) => [key, parseFloat(((value / getTotalComments(filteredData)) * 100).toFixed(2))])).filter(([key, value]) => value > 5)
    );

    const percentageDataSlice = (filteredData) => Object.fromEntries(
        Object.entries(percentageData(filteredData)).slice(0, 4)
    );


    const [filteredData, setFilteredData] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [labelData, setLabelData] = useState([...Object.keys(percentageDataSlice(filteredData))]);
    const [serieData, setSerieData] = useState([...Object.values(percentageDataSlice(filteredData))]);

    const handleYearChange = (_year) => {
        setSelectedYear(_year);
        try {
            const _ChartToggleData = ChartToggleData[_year];
            const hasEntries = Object.keys(_ChartToggleData).length > 0;
            if (hasEntries) {
                setFilteredData(_ChartToggleData);
                setLabelData([...Object.keys(percentageDataSlice(_ChartToggleData))]);
                setSerieData([...Object.values(percentageDataSlice(_ChartToggleData))]);
            } else {
                setLabelData(["No Data"]);
                setSerieData([0]);
            }
        } catch (error) {
            setLabelData(["No Data"]);
            setSerieData([100]);
        }
    };

    const handleYearChangeEvent = (event) => {
        const _year = event.target.value;
        handleYearChange(_year);
    };


    const series = serieData;

    const options2 = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: 50,
                endAngle: 270,
                hollow: {
                    margin: 150,
                    size: '40%',
                    background: 'transparent',
                    image: undefined,
                },
                dataLabels: {
                    name: {
                        fontSize: '22px',
                    },
                    value: {
                        fontSize: '16px',
                    },
                    total: {
                        show: true,
                        label: 'Total Comments',
                        formatter: function (w) {
                            return getTotalComments(filteredData)
                        }
                    }
                }
            }
        },
        colors: ['#1ab7ea', '#5664d2', '#1cbb8c', '#eeb902'],
        labels: labelData,
        legend: {
            show: true,
            floating: true,
            fontSize: '16px',
            position: 'top',
            offsetX: 0,
            offsetY: 15,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                size: 0
            },
            formatter: function (seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
            },
            itemMargin: {
                vertical: 0
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    show: true
                }
            }
        }]
    };


    useEffect(() => {
        setChartToggleData(groupedByYearAndAuthorFilterByTopic(topic))
        const _totalLen = Object.entries(ChartToggleData).length;
        const _LastYear = Object.keys(ChartToggleData)[_totalLen - 1];

        handleYearChange(_LastYear)

        return () => {
        };
    }, []); 

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <ButtonGroup className="float-end">
                        <div className="float-end">
                            <select className="form-select form-select-sm" value={selectedYear} onChange={handleYearChangeEvent}>
                                { Object.keys(ChartToggleData).map((year, index) => (
                                    <option value={year} >{year}</option>
                                ))}
                            </select>
                        </div>
                    </ButtonGroup>

                    <h4 className="card-title mb-4">Top Commented</h4>
                    <div className="text-center">
                        <div>
                            <div className="mb-3">
                                <div id="radialchart-1" className="apex-charts">
                                    <ReactApexChart options={options2} series={series} type="radialBar" height="350" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default ByTopicCommentReports;