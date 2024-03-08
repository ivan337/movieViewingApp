import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/counter/counterSlice'

export default configureStore({
    reducer: {
        login: loginSlice,
    },
})