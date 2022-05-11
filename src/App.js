import SearchBar from "./features/SearchBar"
import CurrentDay from "./features/CurrentDay"
import CitiesList from "./features/CitiesList"
import NextDay from "./features/NextDay"
import ExtraInfo from "./features/ExtraInfo"
import Footer from "./features/Footer"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectWeather } from "./features/weather/weatherSlice"
import { Alert } from "react-bootstrap"

function App() {
	const [citiesList, setCitiesList] = useState([])
	const weather = useSelector(selectWeather)

	const handleNewCitiesList = async (list) => {
		// filter duplicates from request response
		if (!list) return
		const uniqueList = [...list].filter((location, index, self) => {
			return (
				index ===
				self.findIndex((info) => {
					return (
						Math.floor(info.lat) === Math.floor(location.lat) &&
						Math.floor(info.lon) === Math.floor(location.lon)
					)
				})
			)
		})
		setCitiesList(uniqueList)
	}

	const handleCityClick = () => {
		setCitiesList([])
	}

	return (
		<>
			<SearchBar handleNewCitiesList={handleNewCitiesList} />
			{!citiesList?.length && !weather?.cityName ? (
				<Alert variant="info">
					Search for a city to see its weather!
				</Alert>
			) : citiesList.length ? (
				<>
					{citiesList.map((city) => (
						<CitiesList
							key={city.lon}
							city={city}
							handleCityClick={handleCityClick}
						/>
					))}
				</>
			) : (
				<>
					<CurrentDay />
					<NextDay />
					<ExtraInfo />
				</>
			)}
			<Footer />
		</>
	)
}

export default App
