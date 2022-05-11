import React from "react"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "./weather/weatherSlice"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

function ExtraInfo() {
	const today = useSelector(selectWeather)?.weatherToday
	console.log(today)

	const timeFormatter = (unixTime) => {
		const date = new Date(unixTime * 1000)
		const hour =
			date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
		const minutes =
			date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
		return hour + ":" + minutes
	}

	return (
		<>
			<div className="extra-info-container">
				<Card>
					<div>UV Index: {today.uvi}</div>
				</Card>
				<Card>
					<div>
						<p className="mb-0">
							Sunrise: {timeFormatter(today.sunrise)}
						</p>
						<p className="mb-0">
							Sunset: {timeFormatter(today.sunset)}
						</p>
					</div>
				</Card>
				<Card>
					<div className="d-flex flex-column align-items-center">
						<ArrowRightAltIcon
							fontSize="large"
							sx={{ transform: `rotate(${today.wind_deg}deg)` }}
						/>
						Wind Speed: {Math.floor(today.wind_speed)} Km/h
					</div>
				</Card>
				<Card>
					<div>Pressure: {today.pressure}mm/Hg</div>
				</Card>
			</div>
		</>
	)
}

export default ExtraInfo
