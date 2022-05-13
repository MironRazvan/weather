import React from "react"
import { Accordion, Card } from "react-bootstrap"
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

	const hourFormatter = (unixTime) => {
		const date = new Date(unixTime * 1000)
		const hour =
			date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
		const minutes =
			date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
		return hour + ":" + minutes
	}

	const pascalCase = (str) => {
		return str.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
			return g1.toUpperCase() + g2.toLowerCase()
		})
	}

	return (
		<Card className="next-days-container">
			<Card.Body>
				<Accordion>
					{weather?.map((day, index) => {
						return (
							<Accordion.Item key={day.moonset} eventKey={index}>
								<Accordion.Header>
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
														day.weather[0]
															?.description
													)}
												</p>
											</div>
											<div className="d-flex align-items-center gap-1">
												<div className="d-flex flex-column">
													<ArrowDownwardIcon className="arrow-down" />
													<p className="temp-indicator">
														Low
													</p>
												</div>
												{Math.ceil(day.temp.min)}°
											</div>
											<div className="d-flex align-items-center gap-1">
												<div className="d-flex flex-column">
													<ArrowUpwardIcon className="arrow-up" />
													<p className="temp-indicator">
														High
													</p>
												</div>
												{Math.ceil(day.temp.max)}°
											</div>
										</div>
									</div>
								</Accordion.Header>
								<Accordion.Body className="row">
									<div className="col">
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Max temperature
											</span>
											: {Math.floor(day.temp?.day)}°
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Min temperature
											</span>
											: {Math.floor(day.temp?.min)}°
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Rain chance
											</span>
											:{" "}
											{Math.round((day.pop * 100) / 5) *
												5}
											%
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Humidity
											</span>
											: {day.humidity}
										</p>
									</div>
									<div className="col">
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Sunrise
											</span>
											: {hourFormatter(day.sunrise)}
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Sunset
											</span>
											: {hourFormatter(day.sunset)}
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												UV Index
											</span>
											: {day.uvi}
										</p>
										<p className="mb-0">
											<span
												style={{
													color: "var(--text-accent)",
													fontWeight: "700",
												}}
											>
												Wind Speed
											</span>
											: {Math.ceil(day.wind_speed)}
											Km/h
										</p>
									</div>
								</Accordion.Body>
							</Accordion.Item>
						)
					})}
				</Accordion>
			</Card.Body>
		</Card>
	)
}

export default NextDay
