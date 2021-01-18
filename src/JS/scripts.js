import axios from "axios"

// Axios GET request to Spotify endpoint:
let search = async (token, input, type) => {	
	/* 
		token: implicit grant auth token
		input: searched artist or id 
		type: type of item being searched in Spotify database: artist, album
		offset: page of search results 
	*/
	if (type === "albums") {
		// Get albums
		try {
			let response = await axios.get("https://api.spotify.com/v1/artists/" + input + "/albums", {
				headers: {
					"Authorization": "Bearer " + token,
					'Content-Type': 'application/json',
					"Accept": "application/json"
				}
			});
			return response.data;
		} catch (error) {
			console.error(error);
		}
	} else if (type === "artists") {
		// Get artist
		try {
			let response = await axios.get("https://api.spotify.com/v1/search", {
				params: {
					q: input,
					type: "artist",
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
	}
};

// Create artists info array to be displayed in cards
let createArtistsInfo = (data) => {
	let artists = [];
	data.items.forEach(artist => {
		let artistInfo = {
			name: artist.name,
			image: artist.images,

			// Setting popularity for Ant Design star rating; half stars allow for rating out of 10
			popularity: (Math.ceil((artist.popularity+1)/10)-1)/2,

			// Delimiting thousands positions of followers with comma
			followers: artist.followers.total.toLocaleString('en-US'),

			// Id required for getting albums
			id: artist.id
		};
		
		// Getting highest resolution image
		if (artist.images.length > 0) {
			artistInfo.image = artist.images[0].url;
		}
		
		// Keeping Spotify order of artists
		artists.push(artistInfo);
	});
	return artists;
}

// Create albums info array to be displayed in cards
let createAlbumsInfo = (data) => {
	let albums = [];
	data.items.forEach(album => {
		let albumInfo = {
			name: album.name,
			image: album.images,
			artists: [],

			// Release year string slice(0, 4) to isolate the year
			releaseYear: album.release_date/* .slice(0, 4) */,
			numberTracks: album.total_tracks,
			url: album.external_urls.spotify
		};
		
		// Getting highest resolution image
		if (album.images.length > 0) {
			albumInfo.image = album.images[0].url;
		}

		// Filling album's artists list
		if (album.artists.length > 0) {
			if (album.artists.length > 1) {
				album.artists.forEach((artist) => {
					albumInfo.artists.push(artist.name);
				});
			} else {
				albumInfo.artists.push(album.artists[0].name);
			}
		}

		// Keeping Spotify order of albums
		albums.push(albumInfo);
	});
	return albums;
}

// Populating states of artists or albums
let populateStates = (dataType, data, setterFunction) => {
	if (data) {
		if (data.items) {
			if (dataType === "artists") {
				// Artists info
				let artists = createArtistsInfo(data);
				
				// Filling artists state with array of artists
				setterFunction(artists);
			} else if (dataType === "albums") {
				// Albums info
				let albums = createAlbumsInfo(data);

				// Filling albums state with array of albums
				setterFunction(albums);
			}
		}
	}
};

export {search, populateStates};