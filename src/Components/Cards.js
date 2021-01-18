import React from 'react';
import {Typography, Tag, Divider, Col, Card, Rate} from "antd";
import {LinkOutlined} from '@ant-design/icons';

let { Meta } = Card;
let { Title } = Typography;

let imgStyle = {
	borderTopLeftRadius: "5px",
	borderTopRightRadius: "5px",
};

let cardStyle = {
	borderRadius: "5px",
	filter: "drop-shadow(0 0 0.5rem #D8D8D8)",
	height: "100%"
};

let ArtistCard = (props) => {
	let artists = props.artists;
	let getAlbums = props.getAlbums;

	return (
		<>
			{artists.map((artist, index) => (
				<Col key={index} className="gutter-row" span={6}>
					{/* Card onClick displays albums for artists */}
					<Card 
						bordered={false}
						style={cardStyle}
						onClick={() => {getAlbums(artist.id)}}
						type="inner"
						hoverable="true"
						cover={<img style={imgStyle} alt="Missing Artist Img" src={artist.image} />}
					>
						<Meta
							title={<Title level={5}>{artist.name}</Title>}
						/>
						<Divider plain>Followers: {artist.followers}</Divider>
						<Divider plain><Rate disabled value={artist.popularity} allowHalf="true"/></Divider>
						
					</Card>
				</Col>
			))}
		</>
	)
};

let AlbumCard = (props) => {
	let albums = props.albums;
	let getArtists = props.getArtists;

	return (
		<>
			{albums.map((album, index) => (
				<Col flex={6} key={index} className="gutter-row" span={6}>
					{/* Card onClick displays albums for artists */}
					<Card
						bordered={false}
						style={cardStyle}
						type="inner"
						hoverable="true"
						cover={<img style={imgStyle} alt="Missing Album Img" src={album.image} />}
					>
						<Meta
							title={<Title level={5}>{album.name}</Title>}
						/>
						
						<Divider plain>Artists</Divider>
						{album.artists.map((artist, index) => (
							<Tag color="#8AF07F" onClick={() => {getArtists(artist)}}>{artist}</Tag>
						))}
						
						<Divider plain>Album Release Year: {album.releaseYear}</Divider>
						<Divider plain>Number Of Tracks: {album.numberTracks}</Divider>
						<Divider plain>{<a target="_blank" rel="noopener noreferrer" href={album.url}><LinkOutlined /> Preview on Spotify</a>}</Divider>
						
					</Card>
				</Col>
			))}
		</>
	)
};

export {ArtistCard, AlbumCard};