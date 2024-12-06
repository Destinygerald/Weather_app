import './style.css'
import './style.mobile.css'
import img1 from '/images/blue-sky.webp'
import { useState, useEffect } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { LocationContextFunction } from '../../context/LocationContext.jsx'
import { WeatherContextFunction } from '../../context/WeatherContext.jsx'
import { MdSunny, MdThunderstorm } from 'react-icons/md'
import { IoPartlySunny } from 'react-icons/io5'
import { IoIosCloudy, IoMdRainy } from 'react-icons/io'
import { BsFillCloudsFill, BsCloudRainHeavyFill } from 'react-icons/bs'

const Icons = [
	{
		number1: '01n',
		number2: '01d',
		icon: <MdSunny />
	},
	{
		number1: '02n',
		number2: '02d',
		icon: <IoPartlySunny />
	},
	{
		number1: '03n',
		number2: '03d',
		icon: <IoIosCloudy />
	},
	{
		number1: '04n',
		number2: '04d',
		icon: <BsFillCloudsFill />
	},
	{
		number1: '09n',
		number2: '09d',
		icon: <IoMdRainy />
	},
	{
		number1: '10n',
		number2: '10d',
		icon: <BsCloudRainHeavyFill />
	},
	{
		number1: '11n',
		number2: '11d',
		icon: <MdThunderstorm />
	}
]


function MainSidebarCard ({ icon, date, weather, highTemp, lowTemp }) {

	const [ dateInfo, setDateInfo ] = useState((new Date(date * 1000)).toString())

	function handleDate () {
		setDateInfo((new Date(date * 1000)).toString())
	}

	useEffect(() => {
		handleDate()
	}, [])

	return (
		<div className='main-sidebar-card'>
			
			{
				Icons.map((item, i) => {
					if (item.number1 == icon || item.number2 == icon) {
						return (<div key={i}> {item.icon}</div> )
					}
					return;
				})
			} 

			<div>
				<div>
					<span className='main-sidebar-card-weather-type'>{ date ? dateInfo?.slice(0, 3) : '----'}</span>
					<span>{weather || '-----'}</span>
				</div>

				<div>
					<span>{ lowTemp ? parseFloat(lowTemp - 273).toFixed(1) : '-'}°</span>
					<span>{ highTemp ? parseFloat(highTemp - 273).toFixed(1) : '-'}°</span>
				</div>

			</div>
		</div>
	)
}

function MainSidebar () {

	// const [ location, setLocation ] = useState('Ikorodu, Lagos')
	// const [ temp, setTemp ] = useState(18)
	const [ tempType, setTempType ] = useState('C')
	const [ selected, setSelected ] = useState(5)
	
	// const [ forecastChecker, setForecastChecker ] = useState([])
	
	const [ weatherInfo, setWeatherInfo ] = useState([])
	const [ locationBarOpen, setLocationBarOpen ] = useState(false)
	const { location, locationTemp } = LocationContextFunction()
	const { weatherPrediction } = WeatherContextFunction()
	

	function handleSelect (arg) {
		if (arg != 5 && arg != 7 && arg != 14) return;

		setSelected(arg)
	}

	function toggleLocationBar (e) {
		if(e.target.className == 'location-bar') return;
		setLocationBarOpen(!locationBarOpen)
	}
	
	
	const forecastChecker = []

	return (
		<div className='main-sidebar'>
			<div className='main-sidebar-top' onClick={toggleLocationBar}>
				<div> 
					<span> <FaLocationCrosshairs/> </span>
					<span>{location}</span>
				</div>

				{/*<span>{ locationBarOpen ? '▴' : '▾'}</span>*/}

				{	
					locationBarOpen
					?
					''
					// <div className='location-bar'></div>
					:
					''
				}
			</div>




			<div className='main-sidebar-temp'>
				<div>{ parseFloat(locationTemp - 273).toFixed(2)  }°{tempType}</div>

				<div />
			</div>


			<div className='main-sidebar-forecast'>
				<span> The Next 5 Days Forecast </span>

			{/* The api couldn't release data for more than 5 days 😢.
				It really stressed me out [The Api, I think they should update their Documentation] 
			*/}

			{/*				
				<div className='main-sidebar-toggle'>
					<span onClick={() => handleSelect(5)} className={selected == 5 ? 'selected' : ''}> 5 Days </span>
					<span onClick={() => handleSelect(7)} className={selected == 7 ? 'selected' : ''}> 7 Days </span>
					<span onClick={() => handleSelect(14)} className={selected == 14 ? 'selected' : ''}> 14 Days </span>
				</div>
			*/}
			
				<div className='main-sidebar-forecast-cnt'>
					{
						weatherPrediction.map((item, i) => {
							if (!forecastChecker.includes(item.dt_txt.split(' ')[0])) {
								
								forecastChecker.push(item.dt_txt.split(' ')[0])
								return ( <MainSidebarCard key={'main-sidebar-card-' + i} icon={item?.weather[0]?.icon} date={item?.dt} weather={item?.weather[0]?.description} highTemp={item?.main?.temp_max} lowTemp={item?.main?.temp_min} /> )
							}
							return;
						})
					}
				</div>
			</div>

		</div>
	)
}



function DisplayCard ({ time, weather, temp, icon, i }) {
	return (
		<div className='main-display-cnt-card'>
			<span>{ time ? time?.split(' ')[1].slice(0, 5)  : `${i + 9}:00` }</span>

			{
					Icons.map((item, i)=> {
						if (item.number1 == icon || item.number2 == icon) {
							return ( <div key={i}> {item.icon }</div> )
						}
						return;
					})
				} 

			<span>{temp ? parseFloat(temp - 273).toFixed(2) : 9}°C</span>
		</div>
	)
}

function Display ({ weatherInfo }) {

	const { weatherPrediction } = WeatherContextFunction()

	// console.log(weatherPrediction)

	return (
		<div className='main-display'>
			<span>Time</span>

			<div className='main-display-cnt'>
				<span>{ weatherInfo.weather ? weatherInfo?.weather[0]?.description : 'Heavy Rain'}</span>
				<div className='main-display-cnt-line' />
				
				<div>
					{
						weatherPrediction?.slice(0, 10).map((item, i) => (
							<DisplayCard key={'display-card-' + i} i={i} icon={item?.weather[0]?.icon} temp={item?.main?.temp} time={item?.dt_txt} />
						))
					}
				</div>
			</div>
		</div>
	)
}

function Page () {

	const { changeLocation, changeLocationTemp, location, locationTemp } = LocationContextFunction()
	const { changeWeatherInfo, weatherInfo, changeWeatherPrediction } = WeatherContextFunction()
	const ApiKey = 'c8eca5bad07c8ba3b2e3693574d03d27'

	async function getAllWeatherInfo () {
		const ipFetch = await fetch('https://api.ipify.org?format=json')
		const res1 = await ipFetch.json()

		//  PREV API - 'https://ipinfo.io/${ip}/json'
		const locFetch = await fetch(`https://api.ipfind.com/?ip=${res1.ip}`)
		const res2 = await locFetch.json()

		changeLocation(res2.city)
		
		const weatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${res2.latitude}&lon=${res2.longitude}&appid=${ApiKey}`)
		const res3 = await weatherFetch.json()

		changeLocationTemp(res3.main.temp)
		changeWeatherInfo(res3)

		const forecastFetch = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${res2.latitude}&lon=${res2.longitude}&appid=${ApiKey}`)
		const res4 = await forecastFetch.json()
		changeWeatherPrediction([...res4?.list])
		
	}




	useEffect(() => {

		if (location && locationTemp != '0') return;

		getAllWeatherInfo()
	}, [])


	return (
		<div className='main'>
			<Display weatherInfo={weatherInfo} />
			<MainSidebar />

			<div className='bck-img'>
				<img src={img1} />
			</div>
		</div>
	)
}

export default Page