import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { checkUserAuth } from '../store/actions';

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => (
		<Route
			{...rest}
			render={props => {

				if (isAuthProtected && !localStorage.getItem("authUser") ) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}

				// if (checkUserAuth()) {
				// 	return (
				// 		<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
				// 	);
				// }

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
	);

export default withRouter(connect(null,{ checkUserAuth })(AppRoute));

