import React from "react"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "./weather/weatherSlice"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

function NextDay() {
	const weather = useSelector(selectWeather)?.weatherNextDays

	const timeFormatter = (unixTime) => {
		const date = new Date(unixTime * 1000)
		const today = new Date()
		const dayOfWeek =
			date.getDate() === today.getDate()
				? "Today"
				: date.toDateString()?.split(" ")[0]
		return dayOfWeek
	}

	const pascalCase = (str) => {
		return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
			return g1.toUpperCase() + g2.toLowerCase()
		})
	}

	return (
		<Card className="next-days-container">
			<Card.Body>
				{weather?.map((day, index) => {
					return (
						<div
							className="daily-weather-container"
							key={weather[index]?.dt}
						>
							<div className="daily-weather-info">
								<p>{timeFormatter(day.dt)}</p>
								<div className="d-flex align-items-center">
									<img
										src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
										alt="weather state"
									></img>
									<p className="mb-0">
										{pascalCase(
											day.weather[0]?.description
										)}
									</p>
								</div>
								<div className="d-flex align-items-center gap-1">
									<div className="d-flex flex-column">
										<ArrowDownwardIcon className="arrow-down" />
										<p className="temp-indicator">Low</p>
									</div>
									{Math.ceil(day.temp.min)}°
								</div>
								<div className="d-flex align-items-center gap-1">
									<div className="d-flex flex-column">
										<ArrowUpwardIcon className="arrow-up" />
										<p className="temp-indicator">High</p>
									</div>
									{Math.ceil(day.temp.max)}°
								</div>
							</div>
							{index !== weather.length - 1 && (
								<hr className="mx-1 my-1"></hr>
							)}
						</div>
					)
				})}
			</Card.Body>
		</Card>
	)
}

export default NextDay
