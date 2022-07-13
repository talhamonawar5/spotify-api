import useAuth from './useAuth'
import React, { Component, useState } from 'react';
import {Container, Form} from 'react-bootstrap'
import axios from 'axios';
import styled from "styled-components";
import { render } from 'react-dom';

const USER_ENDPOINT = "https://api.spotify.com/v1/me/"
const Button = styled.button`
    background-color: red;
    color: white;
    font-size: 20px;
    
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    justifyContent: 'center',
    position: absolute,
    right: 180px 
    top: 50px 
  `;
  const Button2 = styled.button`
  background-color: blue;
  color: white;
  font-size: 20px;
  
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  justifyContent: 'center',
  position: absolute,
  right: 180px 
  top: 50px 
`;


export default function Dashboard({code}){
    const token = useAuth(code)
    const [data, setData] = useState({});
    const[trackName, setTrackName] = useState("")

    var userId = data.id;
    var PLAYLIST_ENDPOINT2 = 'https://api.spotify.com/v1/users/' + userId + '/playlists'
    const handleGetData = () => {
      axios
        .get(USER_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        userId = data.id;
        PLAYLIST_ENDPOINT2 = 'https://api.spotify.com/v1/users/' + userId + '/playlists'
    };

    const handleGetPlaylistData = () =>
     {
      userId = data.id;
      PLAYLIST_ENDPOINT2 = 'https://api.spotify.com/v1/users/' + userId + '/playlists'
      axios
        .get(PLAYLIST_ENDPOINT2, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(data)
    };
    var playlistNum = ""
    var TRACK_ENDPOINT = "https://api.spotify.com/v1/playlists/" + playlistNum + "/tracks"
    const storePlaylistID = (playlistID) => 
    {
      playlistNum = playlistID
      TRACK_ENDPOINT = "https://api.spotify.com/v1/playlists/" + playlistNum + "/tracks"
      
      
    }

    var test = ""
    var dataItemsLength = 0;
    const handleGetTrackData = () =>
    {
      axios
      .get(TRACK_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data) //JSON Response
        //trackName = response.data.items[0].track.name // First track name
        
        dataItemsLength = response.data.items.length
        for (var i = 0; i < dataItemsLength; i++) {
            test += " " + response.data.items[i].track.name + ","
        }
        console.log(test)
        setTrackName(test)
        //console.log(trackName)
        console.log(dataItemsLength)
        //console.log(test)
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    
    const CURRENT_TRACK_ENDPOINT = "https://api.spotify.com/v1/browse/featured-playlists"
    


    var dark = false;
    var light = true;
    const darkMode = () => 
    { 
      if (dark == true && light == false)
      {
        document.body.style.backgroundColor = "white";
        dark = false
        light = true
      }
      else
      {
      document.body.style.backgroundColor = "#121212";
      dark = true
      light = false;
      }
    }
    
    // userId is undefined until button is clicked. Since the button calls the function which utilizes the access token. 
    // Once the function is called, the userId is pulled from the network response log and store into the variable.
    // npm start for frontend, npm run devStart for backend
    
    
    return (
      <>
      <div>
        <Button onClick = {darkMode}>Dark mode toggle</Button>
      </div>
      <div>
        <Button onClick = {handleGetData}> Get User ID </Button>
        <div style= {{color: 'green'}}> {userId} </div>
      </div>
      <div>
        <Button onClick = {handleGetPlaylistData}> Get names of all playlists </Button>
        {data?.items ? data.items.map((item) => <p style = {{color: 'green'}}>{item.name}</p>) : null}
        {data?.items ? data.items.map((playlistID) => {storePlaylistID(playlistID.id)}) : null}
      </div>
      
      <div>
      <Button2 onClick = {handleGetTrackData}> Get track data </Button2>
      <p style = {{color: 'green'}}>{trackName}</p>
      </div>
      <div>
        
        
      </div>
      </>
    );
}
  
 
