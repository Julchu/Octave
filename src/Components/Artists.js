import React, { useState, useEffect } from 'react';
import {Affix, Row, Col, Input} from "antd";
import {SearchOutlined} from '@ant-design/icons';

import {ArtistCard, AlbumCard} from "./Cards";
import {search, populateStates} from "../JS/scripts";

// Artist component to display search input box and artist listings
let Artists = (props) => {
	// Token from token object
	let token = props.token;
	let inputStyle = props.inputStyle;
	let Cards;
	
	// State Hooks
	let [input, setInput] = useState(""); // Search inputs
	let [artists, setArtists] = useState([]); // Array of artist objects containing artist information: name, images[], popularity, followers
	let [albums, setAlbums] = useState([]);
	let [displayType, setDisplayType] = useState("artists");
	let [history, setHistory] = useState([]);

	// Restoring previous search states
	useEffect(() => {
		// On pressing back button/navigating back
		window.onpopstate = e => {
			// Prevents browser history from backtracking URLs (to Spotify auth hash)
			window.history.replaceState(null, null, "/#");
			window.history.pushState(null, null, "/#");

			// Caching search result arrays as a stack to load previous results
			let previousState = history.pop();
			if (previousState) {
				setDisplayType(previousState.searchType);
				setArtists(previousState.searchInput);
			}
		}		
	});

	// Search-as-you-type functionality
	useEffect(() => {
		// Clear artists' information
		if (input !== "" ) {
			// Set display type to artists view, rather than albums view
			setDisplayType("artists");

			// Clear artists' information
			setArtists([]);

			// Search for artists and populate artists state hook
			let startSearch = async () => {
				let searchResults = await search(token, input, "artists");
				populateStates("artists", searchResults, setArtists);
			};
			startSearch();
		} else {
			// Clears board when input box is emptied (input clear button)
			setArtists([]);
		}
	}, [token, input]);

	let getArtists = async (artist) => {
		// Add artist search to window history state
		let historyState = {
			searchType: "artists", 
			searchInput: artists
		}
		setHistory([...history, historyState]);

		// Set display type to album view, rather than artist view
		setDisplayType("artists");

		// Clear artists' information
		setArtists([]);

		// Search for artists and populate artists state hook
		let searchResults = await search(token, artist, "artists");
		populateStates("artists", searchResults, setArtists);
	};

	let getAlbums = async (id) => {
		// Add to window history stage
		let historyStateArtists = {
			searchType: "artists", 
			searchInput: artists
		}
		setHistory([...history, historyStateArtists]);

		// Set display type to album view, rather than artist view
		setDisplayType("albums");
		
		// Clear previous album
		setAlbums([]);

		// Get albums and populate albums state hook
		let searchResults = await search(token, id, "albums");
		populateStates("albums", searchResults, setAlbums);

		// Clear input
		setInput("");
	};

	if (displayType === "artists") {
		Cards = <ArtistCard artists={artists} getAlbums={getAlbums}/>;
	} else if (displayType === "albums") {
		Cards = <AlbumCard albums={albums} getArtists={getArtists}/>;
	}

	return (
		<>
			{/* Artist search input box */}
			<Row gutter={[4, 24]}>
				<Col className="gutter-row" span={24}>
					{/* Affix search bar to top of window as user scrolls */}
					<Affix offsetTop={24}>
						<Input 
							// prefix={<SearchOutlined />}
							prefix={<SearchOutlined />}
							style={inputStyle}
							size="large" 
							placeholder="Search for an artist…" 
							allowClear="true"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							
							// Ant Design enter button callback function, not really necessarily with type-as-you-go
							onPressEnter={() => getArtists(input)} 
						/>
					</Affix>
				</Col>
			</Row>
			<Row gutter={[24, 24]}>
				{Cards}
			</Row>
		</>
	)
};

export default Artists;

