import { createContext, useContext, useState } from 'react'

const WeatherContext = createContext({})

export function WeatherContextFunction () {
	return (
		useContext(WeatherContext)
	)
}

export function WeatherContextProvider ({ children }) {

	const [ weatherInfo, setWeatherInfo ] = useState({})
	const [ weatherPrediction, setWeatherPrediction ] = useState([])

	function changeWeatherInfo (arg) {
		setWeatherInfo(arg)
	}

	function changeWeatherPrediction (arg) {
		setWeatherPrediction(arg)
	}

	return (
		<WeatherContext.Provider value={{ weatherInfo, weatherPrediction, changeWeatherInfo, changeWeatherPrediction }}>
			{ children }
		</WeatherContext.Provider>
	)
}