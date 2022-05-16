import React from "react"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "../features/weather/weatherSlice"

function CurrentDay() {
	const weather = useSelector(selectWeather)?.weatherToday
	const cityName = useSelector(selectWeather)?.cityName
	const nextDay = useSelector(selectWeather)?.weatherNextDays[0]

	const pascalCase = (str) => {
		return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
			return g1.toUpperCase() + g2.toLowerCase()
		})
	}

	return (
		<>
			<Card className="currentDay-container">
				<Card.Title>{cityName}</Card.Title>
				<Card.Body>
					<div className="weather-description">
						{pascalCase(weather.weather[0]?.description)}
					</div>
					<div className="current-temperature">
						{Math.ceil(weather.temp)}
						<img
							src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
							alt="current weather"
						></img>
					</div>
					<div className="minmax-container">
						<div style={{ color: "blue" }}>
							L: {Math.ceil(nextDay?.temp.night)}°
						</div>
						<div className="vr" />
						<div style={{ color: "red" }}>
							H: {Math.ceil(nextDay?.temp.day)}°
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

export default CurrentDay
