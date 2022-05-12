import React from "react"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "./weather/weatherSlice"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

function ExtraInfo() {
	const today = useSelector(selectWeather)?.weatherToday
	// console.log(today)

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
					<div>
						<span>UV</span> Index: {today.uvi}
					</div>
				</Card>
				<Card>
					<div>
						<p className="mb-0">
							<span>Sunrise</span>: {timeFormatter(today.sunrise)}
						</p>
						<p className="mb-0">
							<span>Sunset</span>: {timeFormatter(today.sunset)}
						</p>
					</div>
				</Card>
				<Card>
					<div className="d-flex flex-column align-items-center">
						<ArrowRightAltIcon
							fontSize="large"
							sx={{
								transform: `rotate(${today.wind_deg + 90}deg)`,
							}}
						/>
						<div>
							<span>Wind Speed</span>:{" "}
							{Math.floor(today.wind_speed)} Km/h
						</div>
					</div>
				</Card>
				<Card>
					<div>
						<span>Pressure</span>: {today.pressure}mm/Hg
					</div>
				</Card>
			</div>
		</>
	)
}

export default ExtraInfo
