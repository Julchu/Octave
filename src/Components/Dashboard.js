import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import "../CSS/Search.css"

// Axios API call for Spotify Implicit Grant
let authenticate = (setStatus) => {
	// axios.get("https://accounts.spotify.com/authorize").then(res => {
	// 	this.setState({
	// 		CADRate: res.data.rates.CAD
	// 	});
	// });
	setStatus(true);
}

let Dashboard = () => {
	// Login status
	let [status, setStatus] = useState(false);
	
	// Modal for Spotify popup
	let [show, setShow] = useState(false);
	let handleClose = () => setShow(false);
	let handleClose = () => setShow(true);

	// clientId
	// responseType
	// redirectUri = "localhost:3000";
	// state
	// scop

	// Authenticate user login status
	// authenticate(setStatus)
	// console.log(status.status)

	// if (status.status) {
		
	// } else {
	// 	// return <button onClick={() => setStatus(true)}>Login</button>
	// 	console.log()
	// }

	if (status === true) {
		return <Button variant="outline-primary">Search for an artist...</Button>
	} else {
		return <Button variant="outline-primary" onClick={() => {authenticate(setShow, setStatus)}}>Login</Button>
	}
}

// Popup modal for Spotify auth
let Popup = () => {


	return 
}

export default Dashboard;

{/* <button >

</button> */}