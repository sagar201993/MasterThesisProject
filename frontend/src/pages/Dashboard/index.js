import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import MiniWidgets from "./MiniWidgets";
import TopicInteractionAnalytics from "./TopicInteractionAnalytics";
import TopicAnalytics from "./TopicAnalytics";
import RecentlyActivity from "./RecentlyActivity";
import { useData } from '../../provider/DataProvider';
import DatatableTables from "../Topics/Components/DatatableTables";
import CommentReports from "./CommentReports";

const Dashboard = () => {

    const jsonData = useData();

    const breadcrumbItems = [
        { title: "Home", link: "/" },
        { title: "Dashboard", link: "#" },
    ];



    const reports = [
        { icon: "ri-stack-line", title: "Total Topics", value: JSON.parse(localStorage.getItem("getUniqueTopics")).length },
        { icon: "ri-stack-line", title: "Total Records", value: localStorage.getItem("getTotalRecords")},
        { icon: "ri-stack-line", title: "Total Comments", value: localStorage.getItem("getTotalComments") },
        { icon: "ri-stack-line", title: "Total Authors", value: JSON.parse(localStorage.getItem("getUniqueAuthors")).length },
        { icon: "ri-stack-line", title: "Top Commented Author", value:localStorage.getItem("mostCommentedAuthor") },
        { icon: "ri-stack-line", title: "Top Commented Topic", value: localStorage.getItem("mostCommentedTopic") },
    ];


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbItems} />

                    <Row>
                        <Row>
                            <MiniWidgets reports={reports} />
                        </Row>

                        <TopicInteractionAnalytics />
                        <Row>
                            <Col xl={4}>
                                <CommentReports />
                            </Col>
                            <Col xl={4}>
                                <TopicAnalytics />
                            </Col>

                            {/* recent activity */}
                            <RecentlyActivity />

                        </Row>
                    </Row>

                    <Row>
                        <DatatableTables topic={"*"}></DatatableTables>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
