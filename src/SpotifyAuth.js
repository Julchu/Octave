// Required params for Spotify implicit grant flow:
// Don't need scopes due to searching Spotify information, not user information
let authEndpoint = "https://accounts.spotify.com/authorize";
let clientId = "";
let redirectUri = "http://localhost:8888";
let responseType = "token";
// let state = "123"; // Optional parameter

let spotifyURL = authEndpoint + "?client_id=" + clientId + "&redirect_uri=" + redirectUri + "&response_type=" + responseType + "&show_dialog=true";

module.exports = spotifyURL;