import React from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { loadCityWeather } from "./weather/weatherSlice"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

function CitiesList(props) {
	const dispatch = useDispatch()

	const handleCityClick = () => {
		const cityName =
			props.city?.name +
			" (" +
			(props.city.state ? props.city.state + ", " : "") +
			props.city.country +
			")"
		dispatch(
			loadCityWeather({
				name: cityName,
				lat: props.city.lat,
				lon: props.city.lon,
			})
		)
		props.handleCityClick()
		try {
			document.getElementById("city-name").value = null
		} catch (error) {}
	}

	const openInMaps = (e) => {
		e.preventDefault()
		console.log(window.location.href)
		window.location.href = `https://www.google.com/maps/place/${
			props?.city?.name
		}, +${
			props?.city?.state ? props?.city?.state?.replace(/\s/g, "") : ""
		}, +${props?.city?.country}/@${props?.city?.lat},${props?.city?.lon}`
	}

	const displayFormatter = !props.city?.state?.length
		? "d-flex gap-1"
		: props.city?.state?.length < 14
		? "d-flex gap-1"
		: "d-flex gap-1 flex-column"

	return (
		<>
			{props && (
				<div className="search-results-container">
					<ArrowRightIcon sx={{ color: "rgba(51, 0, 124, 1)" }} />
					<div className={displayFormatter}>
						<p
							className="mb-0"
							style={{
								color: "white",
								textShadow: "2px 1px 1px #000000",
							}}
							onClick={() => handleCityClick()}
						>
							{props.city?.name}
						</p>
						<p
							className="mb-0"
							style={{
								color: "rgba(255, 255, 255, 0.5)",
								textShadow: "2px 1px 1px #2F2F2F",
							}}
						>
							({props.city.state ? props.city.state + " - " : ""}
							{props.city.country})
						</p>
					</div>
					<Button
						variant="link"
						onClick={(e) => openInMaps(e)}
						style={{ color: "rgba(51, 0, 124, 1)" }}
					>
						GoogleMaps
					</Button>
				</div>
			)}
		</>
	)
}

export default CitiesList
