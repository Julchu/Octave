import React, { useState, useEffect } from 'react';
import {Row, Col, Input, Card, Rate} from "antd";
import { FaSpotify } from "react-icons/fa";

import Albums from "./Albums";
import axios from "axios"

import "../CSS/Search.css"

let { Meta } = Card;

// Axios GET request to Spotify endpoint:
let search = async (token, input, type) => {	
	/* 
		token: implicit grant auth token
		input: searched artist
		type: type of item being searched in Spotify database: artist, album
		offset: page of search results 
	*/
	
	try {
		let response = await axios.get("https://api.spotify.com/v1/search", {
			// Test
			params: {
				q: input,
				type: type,
				offset: "0",
				limit: "20"
			}, 
			headers: {
				"Authorization": "Bearer " + token,
				'Content-Type': 'application/json',
				"Accept": "application/json"
			}
		});
		return response.data.artists;
	} catch (error) {
		console.error(error);
	}
};

// Populating states of artists, artist images
let populateStates = (data, setArtists) => {
	let artists = []
	if (data) {
		if (data.items) {
			data.items.forEach(artist => {
				console.log(artist.popularity);
				let artistInfo = {
					name: artist.name,
					image: artist.images,

					// Setting popularity for Ant Design star rating; half stars allow for rating out of 10
					popularity: (Math.ceil((artist.popularity+1)/10)-1)/2,
					followers: artist.followers.total
				};
				
				// Getting highest resolution image
				if (artist.images.length > 0) {
					artistInfo.image = artist.images[0].url;
				}

				artists.push(artistInfo);
			});
		}
	}
	// Filling artists state with array of artists
	setArtists(artists);
};

// Artist component to display search input box and artist listings
let Artists = (props) => {
	// Token from token object
	let token = props.token;

	// State Hooks
	let [input, setInput] = useState(""); // Artist search inputs
	let [artists, setArtists] = useState([]); // Array of artist objects containing artist information: name, images[], popularity, followers

	// Ant Design enter button callback function
	let handleKeyDown = async () => {
		// Clear artists' information
		setArtists([]);

		// Search for artists and populate artists state hook
		let searchResults = await search(token, input, "artist");
		populateStates(searchResults, setArtists);

		setInput("");
	}

	// Search-as-you-type functionality
	useEffect(() => {
		// Clear artists' information
		if (input !== "" ) {
			setArtists([]);
			// Search for artists and populate artists state hook
			let startSearch = async () => {
				let searchResults = await search(token, input, "artist");
				populateStates(searchResults, setArtists);
			};
			startSearch();
		}
	}, [token, input]);

	// Updates on artists state
	useEffect(() => {
		// console.log(artists);
	}, [artists])

	return (
		<>
			{/* Artist search input box */}
			<Row gutter={[4, 16]}>
				<Col className="gutter-row" span={24}>
					<Input
						prefix={<FaSpotify />}
						size="large" 
						placeholder="Search for an artist…" 
						allowClear="true" 
						onPressEnter={handleKeyDown} 
						value={input} onChange={(e) => setInput(e.target.value)}
					/>
				</Col>
			</Row>
			
			{/* Artist cards */}
			<Row gutter={[16, 16]}>
				{artists.map((artist, index) => (
					<Col className="gutter-row" span={4}>

						{/* Card onClick displays albums for artists */}
						<Card onClick={() => {console.log("yes")}}
							// style={{ maxHeight: "10%" }}
							type="inner"
							hoverable="true"
							cover={<img alt="artist" src={artist.image} />}
						>
						<Meta
							title={artist.name}
						/>
						Followers: {artist.followers}
						<Rate disabled value={artist.popularity} allowHalf="true"/>
						</Card>
					</Col>					
				))}
			</Row>
		</>
	)
};

export default Artists;

// let data = [
// 	'Racing car sprays burning fuel into crowd.',
// 	'Japanese princess to wed commoner.',
// 	'Australian walks 100km after outback crash.',
// 	'Man charged over missing wedding girl.',
// 	'Los Angeles battles huge wildfires.',
// ];

/* <List
		size="small"
		header={<div>Header</div>}
		footer={<div>Footer</div>}
		bordered
		dataSource={data}
		renderItem={item => <List.Item>{item}</List.Item>}
/> */

/* <CardColumns style={{display: 'flex', flexDirection: 'column'}}>
	{["Artist 1", "Artist 2", "Artist 3", "Artist 4", "Artist 5", "Artist 6", "Artist 7", "Artist 8", "Artist 9", "Artist 10", "Artist 11", "Artist 12", "Artist 13", "Artist 14", "Artist 15", "Artist 16", "Artist 17", "Artist 18", "Artist 19", "Artist 20", "Artist 21", "Artist 22", "Artist 23", "Artist 24",].map((name, index) => (
	
		<Card style={{ width: '18rem' }}>
			<Card.Img variant={"primary"} src="https://i.scdn.co/image/8655f0fdf5f2d897af934be45f5a40fc7afa29cd" />
			<Card.Body>
				<Card.Title>Card {name}</Card.Title>
				<Card.Text>
					{name}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<small className="text-muted">Footer</small>
			</Card.Footer>
		</Card>
	))}
</CardColumns> */