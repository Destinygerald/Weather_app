import './App.css'
import './App.mobile.css'
import { useState } from 'react'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { LuSearch } from 'react-icons/lu'

function NavMiddle () {

	// const [ searchOpen, setSearchOpen ] = useState(false)
	// const [ search, setSearch ] = useState('')
	const [ temp, setTemp ] = useState(28)
	const [ tempOpen, setTempOpen ] = useState(false)
	const [ tempType, setTempType ] = useState('C')
	const [ location, setLocation  ] = useState('Ikorodu, Lagos')

	function changeTempType (arg) {
		if (arg != "C"  && arg != 'F') {
			setTempOpen(false)
			return;
		}

		setTempType(arg)
		setTempOpen(false)
	}

	return (
		<div className='nav-middle'>
			<div className='nav-temp'>
				<span> <FaLocationCrosshairs /> </span>
				<span>{location}</span>
				<span>{temp}</span>
			</div>
{/*
			<div>
				<LuSearch />
			</div>*/}

			<div className='nav-temp-set' onClick={() => setTempOpen(!tempOpen)}>
				<div>
					<span>∘</span>
					<span>{tempType}</span>
				</div>

				<span className='nav-settings'> <IoIosSettings /> </span>
			</div>

			{
				tempOpen
				?
				<div className='nav-temp-options'>
					<span onClick={() => changeTempType('F')}>F (Farenheit)</span>
					<span onClick={() => changeTempType('c')}>C (Celcius)</span>
				</div>
				:
				<></>
			}
		</div>
	)
}

export function Navbar () {
	return (
		<div className='navbar'>
			<div className='nav-logo'>Fraij</div>

			<NavMiddle />

			<div className='nav-end'>
				<div>About</div>
				<div>Services</div>
			</div>
		</div>
	)
}