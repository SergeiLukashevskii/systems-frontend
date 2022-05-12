import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSystems } from '../http/systemsApi'
import { getUser } from '../http/userApi'

interface State {
  user: null | UserInfo
  systems: [] | System[]
}

interface System {
  userId: string
  name: string
  daysCount: number
  exercises: DaysExercisesInterface
  id: string
}
export interface DaysExercisesInterface {
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
    setUserSystems: (state, action: PayloadAction<State>) => {
      state.systems = action.payload.systems
    },
    cleanStore: state => {
      state.user = null
      state.systems = []
    }
  },
  extraReducers: buldier => {
    buldier
      .addCase(getUser.fulfilled, (state, action: PayloadAction<State>) => {
        state.user = action.payload.user
      })
      .addCase(getSystems.fulfilled, (state, action: PayloadAction<State>) => {
        state.systems = action.payload.systems
      })
  }
})

export default mainReducer.reducer
export const { setUser, setUserSystems, cleanStore } = mainReducer.actions
