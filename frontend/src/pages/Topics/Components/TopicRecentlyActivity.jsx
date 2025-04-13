import React, {useState,useEffect } from 'react';
import { Card, CardBody, Col} from "reactstrap";
import AllJsonData from '../../../assets/jsons/allData.json';

import SimpleBar from "simplebar-react";

const  TopicRecentlyActivity = ({topic}) => {

    const [recentData, setRecentData] = useState([]);

    const formatPostDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix = (day >= 11 && day <= 13) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][day % 10];
        const _suffix = suffix === undefined ? 'th' : suffix;
      
        return `${day}${_suffix} ${date.toLocaleDateString('en-US', options)}`;
      };


      useEffect(() => {
        const data = AllJsonData.filter(item => item.topic.includes(topic));
        setRecentData(data);

        return () => {};
    }, [topic]);


        return (
            <React.Fragment>
                <Col lg={4}>
                    <Card>
                        <CardBody>
                            <h4 className="card-title mb-4">Recent Activity Feed </h4>

                            <SimpleBar style={{ maxHeight: "345px" }}>
                                <ul className="list-unstyled activity-wid">
                                    {recentData.map((post, index) => (
                                        <li className="activity-list">
                                            <div className="activity-icon avatar-xs">
                                                <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                    <i className="ri-discuss-line"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <div>
                                                    <h5 className="font-size-13">{formatPostDate(post.formatedDate)} <small className="text-muted">{post.author}</small></h5>
                                                </div>

                                                <div>
                                                    <p className="text-muted mb-0">{post.title}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </SimpleBar>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
}

export default TopicRecentlyActivity;