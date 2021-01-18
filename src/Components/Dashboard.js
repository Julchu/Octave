import React, {useState, useEffect} from 'react';

// CSS Framework Ant Design
import {Button} from "antd";
import { PoweroffOutlined } from '@ant-design/icons';

import Artists from "./Artists";
import spotifyURL from "../SpotifyAuth";

import 'antd/dist/antd.css';

// Authenticate user login status
let authenticate = () => {
	window.location.href = spotifyURL;
};
	
let Dashboard = () => {
	// Login status
	let [status, setStatus] = useState("false");
	let [token, setToken] = useState("");

	// On page loads, check website hash to see if user is authenticated from Spotify
	useEffect(() => {
		let hash = window.location.hash;
		if (hash) {
			window.history.replaceState(null, null, "/");
			window.location.hash = "";
			setStatus(true);
			setToken(hash.split("&")[0].replace("#access_token=", ""));
		}
	}, [status]);

	let buttonStyle = {
		borderRadius: "5px", 
		filter: "drop-shadow(0 0 0.5rem #D8D8D8)"
	}

	// If authenticated, display Artist component to search/display artists
	// Else: display button to launch authentication page
	if (status === true) {
		return (
			<>
				{/* Spotify developer access token required for making Spotify API calls */}
				<Artists inputStyle={buttonStyle} token={token}/>
			</>
		)
	} else {
		// Button onClick redirects to Spotify authentication page
		return <Button style={buttonStyle} size="large" icon={<PoweroffOutlined />} block="true" onClick={() => {authenticate()}}>Login</Button>
	}
};

export default Dashboard;