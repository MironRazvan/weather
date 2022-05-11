import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import weatherReducer from "../features/weather/weatherSlice"

export const store = configureStore(
	{ reducer: { weather: weatherReducer } },
	applyMiddleware(thunk)
)
