import React from "react";
import DatatableTables from "./Components/DatatableTables";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import MiniWidgets from '../Dashboard/MiniWidgets'
import AllJsonData from '../../assets/jsons/allData.json';
import TopicRecentlyActivity from './Components/TopicRecentlyActivity';
import ByTopicCommentReports from './Components/ByTopicCommentReports';
import TopicInteractionAnalyticsFilterByTopic from './Components/TopicInteractionAnalyticsFilterByTopic';
import FunnelChartByAuthorAndComments from './Components/FunnelChartByAuthorAndComments';
import LineChartByAuthorAndComments from './Components/LineChartByAuthorAndComments';
import { getTotalRecordByTopics, getTotalCommentsByTopics, getUniqueAuthorsByTopics, mostCommentedAuthor } from '../../provider/GeneralFunctions'
import PolarAreaChartByAuthorAndComments from './Components/PolarAreaChartByAuthorAndComments';


const TCpu = () => {


    const breadcrumbItems = [
        { title: "Topics", link: "#" },
        { title: "Cpu", link: "#" },
    ];
    const _topic = "Cpu";

    const reports = [
        { icon: "ri-stack-line", title: "Total Records", value: getTotalRecordByTopics(AllJsonData, _topic) },
        { icon: "ri-stack-line", title: "Total Comments", value: getTotalCommentsByTopics(AllJsonData, _topic) },
        { icon: "ri-stack-line", title: "Total Authors", value: getUniqueAuthorsByTopics(AllJsonData, _topic).length },
        { icon: "ri-stack-line", title: "Top Commented Author", value: mostCommentedAuthor(AllJsonData, _topic) },
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title={_topic} breadcrumbItems={breadcrumbItems} />

                    <Row>
                        <Row>
                            <MiniWidgets reports={reports} />
                        </Row>

                        <Row>
                            <Col xl={9}>
                                <LineChartByAuthorAndComments topic={_topic}></LineChartByAuthorAndComments>
                            </Col>
                            <Col xl={3}>
                                <FunnelChartByAuthorAndComments topic={_topic}></FunnelChartByAuthorAndComments>
                            </Col>

                            <Col xl={4}>
                                <ByTopicCommentReports topic={_topic} />
                            </Col>

                            <TopicRecentlyActivity topic={_topic} />
                            <Col xl={4}>
                                <PolarAreaChartByAuthorAndComments topic={_topic} />
                            </Col>s

                        </Row>
                    </Row>



                    <Row>
                        <Col xl={6}>

                            <TopicInteractionAnalyticsFilterByTopic topic={_topic} showTopicDropdown={true} defaultChartType={"area"} ></TopicInteractionAnalyticsFilterByTopic>
                        </Col>

                        <Col xl={6}>

                            <TopicInteractionAnalyticsFilterByTopic topic={_topic} showTopicDropdown={true} defaultChartType={"line"}></TopicInteractionAnalyticsFilterByTopic>
                        </Col>
                    </Row>


                    <Row>
                        <DatatableTables topic={_topic}></DatatableTables>
                    </Row>

                        <TopicInteractionAnalyticsFilterByTopic topic={_topic} defaultChartType={"bar"}></TopicInteractionAnalyticsFilterByTopic>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default TCpu;
