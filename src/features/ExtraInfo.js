import React from "react"
import { Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { selectWeather } from "./weather/weatherSlice"
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"

function ExtraInfo() {
	const today = useSelector(selectWeather)?.weatherToday

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
				<Card style={{ position: "relative" }}>
					<div>
						<span>UV</span> Index: {today.uvi}
					</div>
					<p
						style={{
							position: "absolute",
							top: "0%",
							left: "3%",
							fontSize: "0.8rem",
						}}
					>
						UV index
					</p>
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
				<Card style={{ position: "relative" }}>
					<div className="d-flex flex-column align-items-center">
						<ArrowRightAltIcon
							fontSize="large"
							sx={{
								position: "relative",
								transform: `rotate(${
									today.wind_deg + 90
								}deg) scale(2.8)`,
							}}
						/>
						<div
							style={{
								content: "",
								backgroundColor: "var(--card-body)",
								width: "1.5rem",
								height: "1.5rem",
								position: "absolute",
								top: "35%",
								borderRadius: "50%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<p
								className="m-0"
								style={{
									color: "var(--text-accent) !important",
									fontWeight: "700",
								}}
							>
								{Math.floor(today.wind_speed)}
							</p>
						</div>

						<p
							className="m-0"
							style={{
								marginTop: "-50%",
								padding: "0",
								fontSize: "0.6rem",
								position: "absolute",
								right: "5%",
								bottom: "5%",
							}}
						>
							Km/h
						</p>
					</div>
					<p
						style={{
							position: "absolute",
							fontSize: "0.8rem",
							top: "0%",
							left: "3%",
						}}
					>
						Wind Speed
					</p>
				</Card>
				<Card style={{ position: "relative" }}>
					<div>
						<span>{today.pressure}</span> mm/Hg
					</div>
					<p
						style={{
							position: "absolute",
							fontSize: "0.8rem",
							top: "0%",
							left: "3%",
						}}
					>
						Air Pressure
					</p>
				</Card>
			</div>
		</>
	)
}

export default ExtraInfo
