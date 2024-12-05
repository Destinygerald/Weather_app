import './style.css'
import './style.mobile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bck from '/images/buildings.webp'
import img2 from '/images/glass_city.webp'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { IoMdCloudOutline } from 'react-icons/io'
import { TfiBoltAlt } from 'react-icons/tfi'
import { CiWarning, CiTimer } from 'react-icons/ci'
import { LuArrowUpToLine, LuArrowRight } from 'react-icons/lu'
import { Navbar } from '../../Navbar.jsx'
import { LocationContextFunction } from '../../context/LocationContext.jsx'
import { WeatherContextFunction } from '../../context/WeatherContext.jsx'

function PageBanner () {

	const navigate = useNavigate()

	return (
		<div className='home-page-banner'>
			<div className='home-page-cnt'>
				<div>
					<span> Precise ※ weather, </span>
					<span> precisely for you. </span>
				</div>

				<div className='home-page-cnt-btn' onClick={() => navigate('/weather')}>
					<div>Let start</div>

					<div className='home-page-cnt-btn-arrow'>
						<div>
							<span> <FaLongArrowAltRight /> </span>
							<span> <FaLongArrowAltRight /> </span>
						</div>
					</div>
				</div>
			</div>


			<div className='home-page-img'>
				<img src={bck} />
			</div>
		</div>
	)
}


function PageAbout (){
	return (
		<div className='home-page-about'>
			<div className='home-page-about-cnt'>
				<div>Don't guess the <br/> weather!</div>

				<span>Rely on Fraij for year-round weather forecast on your location and around the world.</span>

				<div className='home-page-cnt-btn home-about-btn'>
					<div>Explore Benefits</div>

					<div className='home-page-cnt-btn-arrow'>
						<div>
							<span> <FaLongArrowAltRight /> </span>
							<span> <FaLongArrowAltRight /> </span>
						</div>
					</div>
				</div>
			</div>

			<div className='home-page-about-images'>
				<div />
				<div />
				<div />
				<div />

				{/*<svg>
					<path d='M 2,5 S 2, -2 4, 5' stroke='grey' strokeWidth='4' fill='none' />
				</svg>*/}
			</div>
		</div>
	)
}

function PageServiceMenuItem ({ icon, text, current, changeCurrent }) {
	return (
		<div onClick={() => changeCurrent(text)} className={current != text ? 'home-page-service-right-menu-item' : 'home-page-service-right-menu-item active'}>
			<span>{text}</span>
			<span>{icon}</span>
		</div>
	)
}
 
function PageService () {

	const [ current, setCurrent ] = useState('daily data')

	function changeCurrent (text) {
		setCurrent(text)
	}

	return (
		<div className='home-page-service'>
			<div className='home-page-service-left'>
				<img src={img2} />
			</div>

			<div className='home-page-service-right'>

				<div className='home-page-service-right-menu'>
					<PageServiceMenuItem current={current} changeCurrent={changeCurrent} icon={<IoMdCloudOutline/>} text='daily data' />
					<PageServiceMenuItem current={current} changeCurrent={changeCurrent} icon={<TfiBoltAlt />} text='lightning tracker' />
					<PageServiceMenuItem current={current} changeCurrent={changeCurrent} icon={<CiWarning />} text='weather warnings' />
					<PageServiceMenuItem current={current} changeCurrent={changeCurrent} icon={<CiTimer />} text='time data' />
				</div>

				<div className='home-page-service-icon'> 
					{
						current == 'daily data'
						?
						<IoMdCloudOutline />
						:
						current == 'lightning tracker'
						?
						<TfiBoltAlt />
						:
						current == 'weather warnings'
						?
						<CiWarning />
						:
						<CiTimer />						
					} 
				</div>

				<span> /{current} </span>

				<span className='home-page-service-right-info'> Stay prepared for upcoming weather with accurate weather updates. </span>
			</div>
		</div>
	)
}



function PageFooter () {
	return (
		<div className='home-footer'>
			<div className='home-footer-cnt'>
				Know more about Fraij
			</div>

			<div className='home-footer-btm'>
				<span>Copyright©2024 All Rights Reserved</span>

				<div>
					<span>Subscribe</span>
					<span> <LuArrowRight /> </span>
				</div>

				<div> <LuArrowUpToLine /> </div>
			</div>
		</div>
	)
}

function Page () {


	// API KEY - c8eca5bad07c8ba3b2e3693574d03d27

	const { changeLocation, changeLocationTemp } = LocationContextFunction()
	const { changeWeatherInfo } = WeatherContextFunction()
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

		const forecastFetch = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${res2.latitude}&lon=${res2.longitude}&appid=${ApiKey}`)
		const res4 = await forecastFetch.json()
		console.log(res4)
	}


	useEffect(() => {
		getAllWeatherInfo()
	}, [])

	return (
		<div className='home-page'>	
			<Navbar />
			<PageBanner />

			<div className='home-page-banner-curve' />
			<div className='home-page-banner-curve' />

			<PageAbout />
			<PageService />
			<PageFooter />
		</div>
	)
}

export default Page