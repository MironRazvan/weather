import React, { useRef } from "react"
import { Form } from "react-bootstrap"

const API_key = "f620b7055b5b61c16f207821e1b660ee"

function SearchBar(props) {
	const cityName = useRef()

	const fetchCitiesList = async (cityName) => {
		const citiesList = await fetch(
			`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&units=metric&appid=${API_key}`
		)
		const list = await citiesList.json()
		props.handleNewCitiesList(list)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!cityName.current.value) return
		fetchCitiesList(cityName.current.value)
	}

	return (
		<div className="header-container">
			<Form className="w-100" onSubmit={(e) => handleSubmit(e)}>
				<Form.Group className="userInput-form">
					<Form.Label>City name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter a city..."
						id="city-name"
						ref={cityName}
						size="sm"
					/>
				</Form.Group>
			</Form>
		</div>
	)
}

export default SearchBar
