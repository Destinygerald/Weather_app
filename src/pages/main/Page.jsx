import './style.css'
import './style.mobile.css'
import { useState } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { LocationContextFunction } from '../../context/LocationContext.jsx'


function MainSidebarCard ({ icon, date, weather, highTemp, lowTemp }) {
	return (
		<div className='main-sidebar-card'>
			<div> {icon} </div>

			<div>
				<div>
					<span className='main-sidebar-card-weather-type'>{ date || 'Friday'}</span>
					<span>{weather || 'Heavy Rain'}</span>
				</div>

				<div>
					<span>{lowTemp || '9°'}</span>
					<span>{highTemp || '16°'}</span>
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
	const [ locationBarOpen, setLocationBarOpen ] = useState(false)
	const { location, locationTemp } = LocationContextFunction()
	
	function handleSelect (arg) {
		if (arg != 5 && arg != 7 && arg != 14) return;

		setSelected(arg)
	}

	function toggleLocationBar (e) {
		if(e.target.className == 'location-bar') return;
		setLocationBarOpen(!locationBarOpen)
	}

	return (
		<div className='main-sidebar'>
			<div className='main-sidebar-top' onClick={toggleLocationBar}>
				<div> 
					<span> <FaLocationCrosshairs/> </span>
					<span>{location}</span>
				</div>

				<span>{ locationBarOpen ? '▴' : '▾'}</span>

				{	
					locationBarOpen
					?
					<div className='location-bar'></div>
					:
					''
				}
			</div>




			<div className='main-sidebar-temp'>
				<div>{ parseFloat(locationTemp - 270).toFixed(2)  }°{tempType}</div>

				<div />
			</div>


			<div className='main-sidebar-forecast'>
				<span> The Next Days Forecast </span>

				<div className='main-sidebar-toggle'>
					<span onClick={() => handleSelect(5)} className={selected == 5 ? 'selected' : ''}> 5 Days </span>
					<span onClick={() => handleSelect(7)} className={selected == 7 ? 'selected' : ''}> 7 Days </span>
					<span onClick={() => handleSelect(14)} className={selected == 14 ? 'selected' : ''}> 14 Days </span>
				</div>

				<div className='main-sidebar-forecast-cnt'>
					{
						Array.from(Array(selected)).map((item, i) => (
							<MainSidebarCard key={'main-sidebar-card-' + i} />
						))
					}
				</div>
			</div>

		</div>
	)
}



function DisplayCard ({ time, weather, temp, icon, i }) {
	return (
		<div className='main-display-cnt-card'>
			<span>{ time || `${i + 9}:00` }</span>

			<div>{icon}</div>

			<span>{temp || 9}°C</span>
		</div>
	)
}

function Display () {
	return (
		<div className='main-display'>
			<span>Time</span>

			<div className='main-display-cnt'>
				<span>Heavy Rain</span>
				<div className='main-display-cnt-line' />
				
				<div>
					{
						Array.from(Array(10)).map((item, i) => (
							<DisplayCard key={'display-card-' + i} i={i} />
						))
					}
				</div>
			</div>
		</div>
	)
}

function Page () {
	return (
		<div className='main'>
			<Display />
			<MainSidebar />
		</div>
	)
}

export default Page