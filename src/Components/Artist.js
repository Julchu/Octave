import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';

class PhoneStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneStatus: this.props.phoneStatus
		};
		
	}

	componentDidMount() {
		this.socket.on("phoneStatus", (data) => {
			var phoneStatus = this.state.phoneStatus;
			this.setState({phoneStatus: data.status});
		});
	};

	render() {
		return (
			<>
				<td>{this.state.phoneStatus}</td>
			</>
		);
	}
}

export default PhoneStatus;