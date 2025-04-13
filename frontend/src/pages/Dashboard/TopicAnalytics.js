import React, { useState } from 'react';
import { Card, CardBody, Row, Col } from "reactstrap";

//Import Charts
import ReactApexChart from 'react-apexcharts';
import "./dashboard.scss";

const TopicAnalytics = () => {

    const groupedByYearAndTopicCountComment = JSON.parse(localStorage.getItem("groupedByYearAndTopicCountComment"));

    const ChartToggleData = groupedByYearAndTopicCountComment;

    const getTotalComments = (filteredData) => {
        const returnVal =  Object.values(filteredData).reduce((acc, value) => acc + value, 0);
        return returnVal;
    };

    const percentageData = (filteredData) => Object.fromEntries(
        Object.entries(filteredData).sort((a, b) => b[1] - a[1]).map(([key, value]) => [key, parseFloat(((value / getTotalComments(filteredData)) * 100).toFixed(2))])
    );

    const percentageDataSlice = (filteredData) => Object.fromEntries(
        Object.entries(percentageData(filteredData)).slice(0, 3)
    );


    const [filteredData, setFilteredData] = useState(ChartToggleData["2023"]);
    const [selectedYear, setSelectedYear] = useState("2023");
    const [labelData, setLabelData] = useState([...Object.keys(percentageData(filteredData))]);
    const [serieData, setSerieData] = useState([...Object.values(percentageData(filteredData))]);
    const [serieDataSlice, setSerieDataSlice] = useState(percentageDataSlice(filteredData));

    const handleYearChange = (event) => {
        const _year = event.target.value;
        setSelectedYear(_year);
        try {
            const _ChartToggleData = ChartToggleData[_year];
            const hasEntries = Object.keys(_ChartToggleData).length > 0;
            if (hasEntries) {
                setFilteredData(_ChartToggleData);
                setLabelData([...Object.keys(percentageData(_ChartToggleData))]);
                setSerieData([...Object.values(percentageData(_ChartToggleData))]);
                setSerieDataSlice(percentageDataSlice(_ChartToggleData));
            } else {
                setLabelData(["No Data"]);
                setSerieData([0]);
                setSerieDataSlice([0]);
            }
        } catch (error) {
            setLabelData(["No Data"]);
            setSerieData([100]);
            setSerieDataSlice({"No Data" : 0});
        }
    };


    const series = serieData;
    const options = {
        labels: labelData,
        plotOptions: {
            pie: {
                donut: {
                    size: '75%'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false,
        },
        colors: ['#5664d2', '#1cbb8c', '#eeb902'],

    };

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end">
                        <select className="form-select form-select-sm" value={selectedYear} onChange={handleYearChange}>
                            <option value="2023" >2023</option>
                            <option value="2022" > 2022 </option>
                            <option value="2021" > 2021 </option>
                            <option value="2020" > 2020 </option>
                            <option value="2019" > 2019 </option>
                            <option value="2018" > 2018 </option>
                            <option value="2017" > 2017 </option>
                            <option value="2016" > 2016 </option>
                            <option value="2015" > 2015 </option>
                            <option value="2014" > 2014 </option>
                            <option value="2013" > 2013 </option>
                            <option value="2012" > 2012 </option>
                            <option value="2011" > 2011 </option>
                            <option value="2010" > 2010 </option>
                            <option value="2009" > 2009 </option>
                            <option value="2008" > 2008 </option>
                            <option value="2007" > 2007 </option>
                            <option value="2006" > 2006 </option>
                            <option value="2005" > 2005 </option>
                            <option value="2004" > 2004 </option>
                            <option value="2003" > 2003 </option>
                            <option value="2002" > 2002 </option>
                            <option value="2001" > 2001 </option>
                            <option value="2000" > 2000 </option>
                            <option value="1999" > 1999 </option>
                            <option value="1998" > 1998 </option>
                            <option value="1997" > 1997 </option>
                            <option value="1996" > 1996 </option>

                        </select>
                    </div>
                    <h4 className="card-title mb-4">Topic Analytics</h4>

                    <div id="donut-chart" className="apex-charts">
                        <ReactApexChart options={options} series={series} type="donut" height="250" />
                    </div>

                    <Row>
                        {Object.entries(serieDataSlice).map(([category, percentage]) => (
                            <Col xs={4} key={category}>
                                <div className="text-center mt-4">
                                    <p className="mb-2 text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i>{category}</p>
                                    <h5>{`${percentage} %`}</h5>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}


export default TopicAnalytics;