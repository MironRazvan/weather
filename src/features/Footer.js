import React from "react"
import { Stack } from "react-bootstrap"

function Footer() {
	return (
		<div className="footer-container">
			<div className="footer-info">
				<p>Miron Razvan-Alexandru</p>
				<Stack direction="horizontal" gap={2}>
					<p>Weather App</p>
					<div className="vr" />
					<p>2022</p>
				</Stack>
			</div>
		</div>
	)
}

export default Footer
