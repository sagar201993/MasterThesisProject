import React, { Component } from 'react';
import { Card, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

class RecentlyActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            recentData: this.fetchAndSortPosts(),
        }
    }

    fetchAndSortPosts = () => {
        const data = JSON.parse(localStorage.getItem("ScarpedData"));
        return data.slice(0, 50);
    };

    formatPostDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix = (day >= 11 && day <= 13) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][day % 10];
        const _suffix = suffix == undefined ? 'th' : suffix;

        return `${day}${_suffix} ${date.toLocaleDateString('en-US', options)}`;
    };

    render() {
        return (
            <React.Fragment>
                <Col lg={4}>
                    <Card>
                        <CardBody>


                            <h4 className="card-title mb-4">Recent Activity Feed</h4>

                            <SimpleBar style={{ maxHeight: "330px" }}>
                                <ul className="list-unstyled activity-wid">


                                    {this.state.recentData.map((post, index) => (
                                        <li className="activity-list">
                                            <div className="activity-icon avatar-xs">
                                                <span className="avatar-title bg-primary-subtle text-primary rounded-circle">
                                                    <i className="ri-edit-2-fill"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <div>
                                                    <h5 className="font-size-13">{this.formatPostDate(post.formatedDate)} <small className="text-muted">{post.author}</small></h5>
                                                </div>

                                                <div>
                                                    <h6 className="font-size-13">{post.topic}</h6>
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
}

export default RecentlyActivity;