import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactApexChart from "react-apexcharts";
import AllJsonData from '../../../assets/jsons/allData.json';
import getUniqueAuthors from '../../../assets/jsons/processed/getUniqueAuthors.json'
import getUniqueTopics from '../../../assets/jsons/processed/getUniqueTopics.json'

import { geAuthorWithCommentCount, groupedByYearAndAuthor } from '../../../provider/GeneralFunctions';

import "../../Dashboard/dashboard.scss";

const TopicInteractionAnalyticsFilterByTopic = ({ topic, showTopicDropdown = false, defaultChartType = "line" }) => {

    const [chartTopic, setChartTopic] = useState(topic);
    const [title, setTitle] = useState("Interaction Analytics");
    const [titleٍٍٍٍSmallText, setSmallText] = useState("Based on authors comments over the years");
    const [menu, setMenu] = useState(false);
    const [topicMenu, setTopicMenu] = useState(false);
    const [chartType, setChartType] = useState(defaultChartType);
    const [toggleLable, setToggleLable] = useState(false);
    const _geAuthorWithCommentCount = geAuthorWithCommentCount(AllJsonData, chartTopic);
    const allTopicData = AllJsonData.filter(item => item.topic.includes(chartTopic));
    const AuthorDataArray = Object.entries(_geAuthorWithCommentCount).map(([name, count]) => ({ name, count }));
    const authorWithCommentList = {};

    ((AuthorDataArray.sort((a, b) => b.count - a.count)).slice(0, 20)).forEach((entry) => {
        const author = entry.name;
        const commentCount = parseInt(entry.count, 10);

        if (!isNaN(commentCount)) {
            authorWithCommentList[author] = commentCount;
        }
    });

    const groupedDataByYearAndAuthor = groupedByYearAndAuthor(allTopicData, getUniqueAuthors);

    const allAuthors = Object.keys(authorWithCommentList);

    // Filter data based on the date range
    const groupedDataByYearAndAuthorFilteredByFromTo = (from, to) => Object.entries(groupedDataByYearAndAuthor).filter((item) => {
        const year = parseInt(item, 10);
        return year >= from && year <= to;
    });

    const TopAuthorCountByFromTo = (from, to) => {
        // Initialize counts
        const authorCounts = getUniqueAuthors.reduce((acc, author) => {
            acc[author] = 0;
            return acc;
        }, {});
        const __data = groupedDataByYearAndAuthorFilteredByFromTo(from, to);

        let hasEntries = Object.keys(__data).length > 0;
        if (hasEntries) {
            __data.forEach(year => {
                getUniqueAuthors.forEach(author => {
                    authorCounts[author] += year[1][author];
                });
            });
        }

        hasEntries = Object.keys(authorCounts).length > 0;

        if (hasEntries) {
            const _returnVal = Object.keys(authorCounts).reduce((a, b) =>
                authorCounts[a] > authorCounts[b] ? a : b
            )

            let _returnValSum = 0;

            Object.keys(authorCounts).forEach(key => {
                _returnValSum += authorCounts[key]
            });

            let _returnValSumPer = Math.round((authorCounts[_returnVal] / _returnValSum) * 100, 10);
            setTopCommentedAuthor(_returnVal);
            setTopCommentedAuthorCount(Math.round(authorCounts[_returnVal]));
            setTopCommentedAuthorPer(_returnValSumPer);
            setTotalComments(_returnValSum);

            if (_returnValSum == 0) {
                setTopCommentedAuthor("No Data Avaliable");
                setTopCommentedAuthorCount(0);
                setTopCommentedAuthorPer(0);
                setTotalComments(0);
            }
        }
        return "";
    };




    const formattedSeriesData = Object.entries(groupedDataByYearAndAuthor).map(([year, topics]) => ({
        name: year,
        type: chartType,
        data: allAuthors.map((topic) => topics[topic] || 0),
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
        labels: [...allAuthors]
    };


    const [TopCommentedAuthor, setTopCommentedAuthor] = useState("");
    const [TopCommentedAuthorPer, setTopCommentedAuthorPer] = useState(0);
    const [TopCommentedAuthorCount, setTopCommentedAuthorCount] = useState(0);
    const [TotalComments, setTotalComments] = useState(0);
    const [fromYear, setFromYear] = useState(2016);
    const [toYear, setToYear] = useState(2020);

    const onFilterChange = (from, to) => {
        setFromYear(from);
        setToYear(to);
        setSeries([...filteredFormattedData(from, to)]);
        TopAuthorCountByFromTo(from, to);

        if (showTopicDropdown) {
            setSmallText(chartTopic)
        }
    }


    useEffect(() => {
        onFilterChange(2016, 2020);
        return () => {
        };
    }, []);

    useEffect(() => {
        onFilterChange(fromYear, toYear);
    }, [chartType]);

    useEffect(() => {
        onFilterChange(fromYear, toYear);
    }, [chartTopic]);

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
                                    <DropdownItem onClick={() => setChartType("area")}>Area Chart</DropdownItem>
                                    <DropdownItem onClick={() => setChartType("line")}>Line Chart</DropdownItem>
                                    <DropdownItem onClick={() => setChartType("bar")}>Bar Chart</DropdownItem>
                                    <DropdownItem onClick={() => setToggleLable(!toggleLable)}>Toggle DataLable</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                            {showTopicDropdown &&
                                <ButtonDropdown size="sm" color="yellow" isOpen={topicMenu} toggle={() => setTopicMenu(!topicMenu)}>
                                    <DropdownToggle caret>
                                        Change Topics
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {Object.values(getUniqueTopics).map((name, index) => (
                                            <DropdownItem onClick={() => setChartTopic(name)}>{name}</DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </ButtonDropdown>
                            }
                            <Button size="sm" color="light" onClick={() => onFilterChange(2021, 2025)} type="button">2025 - 2021 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2016, 2020)} type="button">2020 - 2016 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2010, 2015)} type="button">2015 - 2011 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2006, 2010)} type="button">2010 - 2006 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(2001, 2005)} type="button">2005 - 2001 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(1995, 2000)} type="button">2000 - 1995 </Button>
                            <Button size="sm" color="light" onClick={() => onFilterChange(1995, 2025)} type="button">All</Button>
                        </ButtonGroup>
                    </div>
                    <h4 className="card-title mb-2">{title}<small> [ {titleٍٍٍٍSmallText} ] </small></h4>
                    <div id="line-column-chart" className="apex-charts" dir="ltr">
                        <ReactApexChart options={options} series={series} height={280} />
                    </div>
                </CardBody>

                <CardBody className="border-top text-center">
                    <Row>
                        <Col sm={6}>
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
                        <Col sm={6}>
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

export default TopicInteractionAnalyticsFilterByTopic;
