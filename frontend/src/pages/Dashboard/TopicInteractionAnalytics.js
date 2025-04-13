import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import ReactApexChart from "react-apexcharts";

import "./dashboard.scss";

const TopicInteractionAnalytics = () => {

    const [menu, setMenu] = useState(false);
    const allTopics = JSON.parse(localStorage.getItem("getUniqueTopics"));
    const allAuthors = JSON.parse(localStorage.getItem("getUniqueAuthors"));
    const groupedDataYearAndTopic = JSON.parse(localStorage.getItem("groupedByYearAndTopic"));
    const groupedDataByYearAndAuthor = JSON.parse(localStorage.getItem("groupedByYearAndAuthor"));

    // Filter data based on the date range
    const groupedDataByYearAndAuthorFilteredByFromTo = (from, to) => Object.entries(groupedDataByYearAndAuthor).filter((item) => {
        const year = parseInt(item, 10);
        return year >= from && year <= to;
    });

    const TopAuthorCountByFromTo = (from, to) => {
        // Initialize counts
        const authorCounts = allAuthors.reduce((acc, author) => {
            acc[author] = 0;
            return acc;
        }, {});
        const __data = groupedDataByYearAndAuthorFilteredByFromTo(from, to);
        
        let hasEntries = Object.keys(__data).length > 0;
        if (hasEntries) {
            __data.forEach(year => {
                allAuthors.forEach(author => {
                    authorCounts[author] += year[1][author];
                });
            });
        }

        hasEntries = Object.keys(authorCounts).length > 0;

        if (hasEntries) {
            const _returnVal = Object.keys(authorCounts).reduce((a, b) =>
                authorCounts[a] > authorCounts[b] ? a : b
            )

            let _returnValSum = 0 ; 
            
            Object.keys(authorCounts).forEach(key => {
                _returnValSum += authorCounts[key]
            });
            
            let _returnValSumPer = Math.round((authorCounts[_returnVal]/_returnValSum)*100, 10);
            setTopCommentedAuthor(_returnVal);
            setTopCommentedAuthorCount(Math.round(authorCounts[_returnVal]));
            setTopCommentedAuthorPer(_returnValSumPer);
            setTotalComments(_returnValSum);
        }
        return "";
    };

    // Filter data based on the date range
    const groupedDataYearAndTopicFilteredByFromTo = (from, to) => Object.entries(groupedDataYearAndTopic).filter((item) => {
        const year = parseInt(item, 10);
        return year >= from && year <= to;
    });

    const TopTopicCountByFromTo = (from, to) => {
        // Initialize counts
        const topicCounts = allTopics.reduce((acc, topic) => {
            acc[topic] = 0;
            return acc;
        }, {});
        const __data = groupedDataYearAndTopicFilteredByFromTo(from, to);
       
        let hasEntries = Object.keys(__data).length > 0;
        if (hasEntries) {
            __data.forEach(year => {
                allTopics.forEach(topic => {
                    topicCounts[topic] += year[1][topic];
                });
            });
        }
        hasEntries = Object.keys(topicCounts).length > 0;

        if (hasEntries) {
            const _returnVal = Object.keys(topicCounts).reduce((a, b) =>
                topicCounts[a] > topicCounts[b] ? a : b
            )

            let _returnValSum = 0 ; 
            
            Object.keys(topicCounts).forEach(key => {
                _returnValSum += topicCounts[key]
            });
            
            let _returnValSumPer = Math.round((topicCounts[_returnVal]/_returnValSum)*100, 10);
            setTopTopic(_returnVal);
            setTopTopicPer(_returnValSumPer);
        }
        return "";
    };

    const [chartType, setChartType] = useState("line");
    const [toggleLable, setToggleLable] = useState(false);

    const formattedSeriesData = Object.entries(groupedDataYearAndTopic).map(([year, topics]) => ({
        name: year,
        type: chartType,
        data: allTopics.map((topic) => topics[topic] || 0),
    }));


    const filteredFormattedData = (from, to) => formattedSeriesData.filter((item) => {
        const year = parseInt(item.name, 10);
        return year >= from && year <= to;
    });

    const [series, setSeries] = useState([...filteredFormattedData(1995, 2000)]);

    const options = {
        chart: {
            // stacked: true,
            toolbar: {
                show: true,
            }
        },
        stroke: {
            width: [0, 3],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
            },
        },
        dataLabels: {
            enabled: toggleLable,
        },

        legend: {
            show: true,
        },
        colors: ['#5664d2', '#1cbb8c', '#eeb902'],
        labels: [...allTopics]
    };

    const [TopTopic, setTopTopic] = useState("");
    
    const [TopTopicPer, setTopTopicPer] = useState(0);
    const [TopCommentedAuthor, setTopCommentedAuthor] = useState("");
    const [TopCommentedAuthorPer, setTopCommentedAuthorPer] = useState(0);
    const [TopCommentedAuthorCount, setTopCommentedAuthorCount] = useState(0);
    const [TotalComments, setTotalComments] = useState(0);

    const onFilterChange = (from, to) => {
        setSeries([...filteredFormattedData(from, to)]);
        TopTopicCountByFromTo(from, to);
        TopAuthorCountByFromTo(from, to);
    }


    useEffect(() => {
        onFilterChange(2016, 2020);
        return () => {
        };
    }, []); 

    useEffect(() => {
        onFilterChange(2016, 2020);
    }, [chartType]);



    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <div className="float-end d-none d-md-inline-block">
                        <ButtonGroup className="mb-2">
                            <ButtonDropdown size="sm" color="light" isOpen={menu} toggle={() => setMenu(!menu)}>
                                <DropdownToggle caret> 
                                    Change Chart Type
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => setChartType("bar")}>Bar Chart</DropdownItem>
                                    <DropdownItem onClick={() => setChartType("area")}>Area Chart</DropdownItem>
                                    <DropdownItem onClick={() => setChartType("line")}>Line Chart</DropdownItem>
                                    <DropdownItem onClick={() => setToggleLable(!toggleLable)}>Toggle DataLable</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2021, 2025)} type="button">2025 - 2021 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2016, 2020)} type="button">2020 - 2016 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2010, 2015)} type="button">2015 - 2011 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2006, 2010)} type="button">2010 - 2006 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2001, 2005)} type="button">2005 - 2001 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(1995, 2000)} type="button">2000 - 1995 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(1995, 2025)} type="button">All</Button>
                        </ButtonGroup>
                    </div>
                    <h4 className="card-title mb-2">Interaction Analytics<small> [ Publication based on topics over the years] </small></h4>
                    <div id="line-column-chart" className="apex-charts" dir="ltr">
                        <ReactApexChart options={options} series={series}  height={280} />
                    </div>
                </CardBody>

                <CardBody className="border-top text-center">
                    <Row>

                        <Col sm={4}>
                            <div className="mt-4 mt-sm-0">
                                <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-waning font-size-10 me-1"></i> Top Posted About :</p>
                                <div className="d-inline-flex">
                                    <h5 className="mb-0 me-2">{TopTopic}</h5>
                                    <div className="text-success">
                                        <i className="mdi mdi-menu-up font-size-14">  {TopTopicPer}%</i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="mt-4 mt-sm-0">
                                <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-primary font-size-10 me-1"></i> Top Commented Authors :</p>
                                <div className="d-inline-flex">
                                    <h5 className="mb-0 me-2">{TopCommentedAuthor}</h5>
                                    <div className="text-success">
                                        <i className="mdi mdi-menu-up font-size-14"> [{TopCommentedAuthorCount}] {TopCommentedAuthorPer}%</i>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="mt-4 mt-sm-0">
                                <p className="mb-2 text-muted text-truncate"><i className="mdi mdi-circle text-success font-size-10 me-1"></i> Total Comments Overall:</p>
                                <div className="d-inline-flex">
                                    <h5 className="mb-0">{TotalComments}</h5>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default TopicInteractionAnalytics;