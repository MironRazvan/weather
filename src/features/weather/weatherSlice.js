import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const API_key = "f620b7055b5b61c16f207821e1b660ee"

const initialState = {
	loading: false,
	cityName: "",
	weatherHourly: [],
	weatherToday: [],
	weatherNextDays: [],
	timezone: "",
	timezoneOffset: 0,
	error: "",
}

export const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadCityWeather.pending, (state) => {
				state.loading = true
			})
			.addCase(loadCityWeather.fulfilled, (state, action) => {
				state.cityName = action.payload?.cityName
				state.weatherHourly = action.payload?.weatherInfo?.hourly
				state.weatherToday = action.payload?.weatherInfo?.current
				state.weatherNextDays = action.payload?.weatherInfo?.daily
				state.timezone = action.payload?.weatherInfo?.timezone
				state.timezoneOffset =
					action.payload?.weatherInfo?.timezone_offset
				state.loading = false
			})
			.addCase(loadCityWeather.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload?.message
			})
	},
})

export const loadCityWeather = createAsyncThunk(
	"loadCityWeather",
	async ({ name, lat, lon }) => {
		const apiCall2 = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${API_key}`
		)
		const finalData = await apiCall2.json()
		// console.log(finalData.timezone)
		return { cityName: name, weatherInfo: finalData }
	}
)

export const selectWeather = (state) => state.weather

export default weatherSlice.reducer
