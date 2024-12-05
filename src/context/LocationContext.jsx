import { createContext, useContext, useState } from 'react'

const LocationContext = createContext({})

export function LocationContextFunction () {
	return ( useContext(LocationContext) )
}

export function LocationContextProvider ({ children }) {
	
	const [ location, setLocation ] = useState('----')
	const [ locationTemp, setLocationTemp ] = useState('0')

	function changeLocation (arg) {
		setLocation(arg)
	}

	function changeLocationTemp (arg) {
		setLocationTemp(arg)
	}

	return (
		<LocationContext.Provider value={{ location, locationTemp, changeLocation, changeLocationTemp }}>
			{ children }
		</LocationContext.Provider>
	)
}