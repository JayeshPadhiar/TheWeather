import React, { Component } from "react";

import { apiCredentials } from './credentials';
import { WeatherType } from './weatherType'

export default class Weather extends Component {
	constructor(props) {
		super(props)

		this.state = {
			statusText: '',
			time: '', name: '', region: '', country: '',
			weather: '', celsius: '', farenhiet: '',
			humidity: '', cloud: '', wind: ''
		}

		this.weather = WeatherType;
		this.apiData = null;

		this.textBox = React.createRef();
		this.weatherResults = React.createRef();
	}
	//componentDidMount=()=>{}
	apiFetch = () => {
		const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiCredentials.key}&q=${this.state.city}`;

		fetch(apiUrl).then(result => result.json()).then((results) => {
			this.setData(results);
			this.weatherResults.current.style.visibility = 'visible';
			console.log(results);
		}).catch(error => {
			this.setState({ statusText: 'Place not found.' })
			this.weatherResults.current.style.visibility = 'hidden'
			console.log(error);
		})
	}

	setData = (data) => {
		
		this.changeBackground(data.current.condition.text);
		
		this.setState({time: data.location.localtime});
		this.setState({ name: data.location.name });
		this.setState({ region: data.location.region });
		this.setState({ country: data.location.country });
		this.setState({ weather: data.current.condition.text });
		this.setState({ celsius: data.current.temp_c });
		this.setState({ farenhiet: data.current.temp_f });
		this.setState({ humidity: data.current.humidity });
		this.setState({ cloud: data.current.cloud });
		this.setState({ wind: data.current.wind_kph });
		this.setState({ statusText: 'Showing latest reports.' });
		
		//document.body.style.backgroundImage = this.weather[data.current.condition.text];
	}

	changeBackground = (img) => {									//not in use
		document.body.style.backgroundImage = this.weather[img];
	}

	textChange = (event) => {
		this.setState({ city: event.target.value });
	}

	search = (event) => {
		event.preventDefault();
		this.apiFetch();
	}

	render() {
		return (
			<div>
				<h1>The Weather</h1>

				<form onSubmit={this.search} >
					<input ref={this.textBox} type='text' placeholder='Enter your City' onChange={this.textChange} />
					<button type='submit'>Search</button>
				</form>

				<div ref={this.weatherResults} className='weatherDisplay'>
					<p>{this.state.name}</p>
					<p>{this.state.region} - {this.state.country}</p>
					<p style={{fontSize: '3em' }}>{this.state.weather}</p>
					<p>Temp: {this.state.celsius} °C / {this.state.farenhiet} °F</p>
					<p>Cloud: {this.state.cloud}%</p>
					<p>Wind: {this.state.wind} Km/hr</p>
					<p>Humidity: {this.state.humidity}%</p>
				</div>

				<p style={{ fontSize: '1em' }}>{this.state.statusText}</p>
			</div>
		)
	}
}