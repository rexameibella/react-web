import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const MapContainer = (props) => {

	let markers = [];

	for(let i = 0; i < props.data.length; i++) {
		markers.push(<Marker
			name={props.data[i]['UserID']}
			position={{ lat: props.data['Latitude'], lng: props.data[i]['Longitude'] }}
			title={props.data[i]['FirstName'] + ' ' + props.data[i]['LastName']} />);
	}

	return (
		<Map google={props.google} zoom={14} initialCenter={{lat: -6.2061361, lng: 106.8532497}}>
			{props.markers}
		</Map>
	);
};

export default GoogleApiWrapper({
	apiKey: 'AIzaSyDLIHeUHdks3qCBlCUQtjgIoB2J7STE59k'
})(MapContainer);