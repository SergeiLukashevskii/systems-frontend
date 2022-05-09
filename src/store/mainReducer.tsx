import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSystems, getUser } from '../http/systemsApi'

interface State {
  user: null | UserInfo
  systems: null | System[]
}

interface System {
  userId: string
  name: string
  daysCount: number
  exersices: DaysExersicesInterface
  _id: string
}
export interface DaysExersicesInterface {
  [key: string]: Exercise[]
}

export interface Exercise {
  name: string
  reps: string
  weight: string
}

export interface UserInfo {
  id: number
  email: string
  role: string
  created_at: number
  updated_at: number
}

const initialState: State = {
  user: null,
  systems: []
}

const mainReducer = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload
    },
    setUserSystems: (state, action: PayloadAction<any>) => {
      console.log(action.payload.systems)
      state.systems = action.payload.systems
    }
  },
  extraReducers: {
    [getSystems.fulfilled]: (state, action) => {
      state.systems = action.payload.systems
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
    }
  }
})

export default mainReducer.reducer
export const {
  setUser,
  setUserSystems
} = mainReducer.actions
