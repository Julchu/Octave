import React, {useState, useEffect} from 'react';
import Artists from "./Artists";
import spotifyURL from "../SpotifyAuth";

// CSS Frameworks
import {Button} from "antd";

import 'antd/dist/antd.css';
import "../CSS/Search.css"

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
			window.location.hash = "";
			setStatus(true);
			setToken(hash.split("&")[0].replace("#access_token=", ""));
		}
	}, [status]);

	// If authenticated, display Artist component to search/display artists
	// Else: display button to launch authentication page
	if (status === true) {
		return (
			<>
				{/* Spotify developer access token required for making Spotify API calls */}
				<Artists token={token}/>
			</>
		)
	} else {
		// Button onClick redirects to Spotify authentication page
		return <Button size="large" block="true" onClick={() => {authenticate()}}>Login</Button>
	}
};

export default Dashboard;