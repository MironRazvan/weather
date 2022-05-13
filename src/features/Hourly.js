import React from "react"
import { Card, Stack } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "./weather/weatherSlice"

function Hourly() {
	const hourly = useSelector(selectWeather)?.weatherHourly
	const weather = useSelector(selectWeather)
	// console.log(weather.weatherHourly)
	// console.log(hourly[0])

	const addTimeOffset = (date = new Date(), timezone, offset) => {
		// console.log(date.toUTCString("en-GB", { timeZone: timezone }))
		date.setSeconds(date.getSeconds() + offset)
		return date.toUTCString("en-US", { timeZone: timezone })
	}

	const timeFormatter = (unixDate) => {
		const normalTime = new Date(unixDate * 1000)
		const currentTime = new Date()

		const offset =
			normalTime.getTimezoneOffset() * 60 + weather.timezoneOffset
		// console.log("offset", offset / 3600, " ore")
		const editedTime = new Date(
			addTimeOffset(normalTime, weather.timezone, offset)
		)
		// if current hour
		if (
			Math.floor(editedTime.getHours() - currentTime.getHours()) ===
			offset / 3600
		)
			return "Now"
		return editedTime.getHours() < 10
			? "0" + editedTime.getHours()
			: editedTime.getHours()
	}

	return (
		<div className="hourly-master">
			<Card className="m-0">
				<Card.Body className="hourly-container">
					{[...hourly].map((day, index) => {
						return (
							index < 24 && (
								<Stack direction="horizontal" gap={1}>
									<div className="hourly-info" key={day.dt}>
										<div>{timeFormatter(day.dt)}</div>
										<div className="d-flex flex-column align-items-center">
											<img
												className="hourly-image"
												src={`http://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`}
												alt="hour weather"
											/>
											{day.pop > 0.3 && (
												<div>
													{Math.round(
														(day.pop * 100) / 5
													) * 5}
													%
												</div>
											)}
										</div>
										<div>{Math.floor(day.temp)}°</div>
									</div>
									{day && index < 23 && (
										<div
											key={day.dt / day.feels_like}
											className="vr"
										/>
									)}
								</Stack>
							)
						)
					})}
				</Card.Body>
			</Card>
		</div>
	)
}

export default Hourly
