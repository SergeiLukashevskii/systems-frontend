import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { $authHost } from '../http'

export const getSystems: any = createAsyncThunk('reducer/getSystems', async () => {
  const { data } = await $authHost.get('api/systems')
  return data
})

export const getUser: any = createAsyncThunk('reducer/getUser', async () => {
  try {
    const { data } = await $authHost.get('api/user')
    return data
  } catch {
    localStorage.removeItem('token')
  }
})

interface State {
  user: null | UserInfo
  currentDay: number
  name: string
  daysCount: string
  daysExersices: daysExersices
  userSystems: {
    [key: string]: {
      userId: string
      daysCount: number
      exersices: {}
      _id: string
    }
  }
}

interface daysExersices {
  [key: string]: Exercise[]
}

export interface Exercise {
  name: number | string
  reps: number | string
  weight: number | string
}

interface ExerciseInfo {
  value: string
  id: number
}

export interface UserInfo {
  id: number
  email: string
  role: string
  created_at: number
  updated_at: number
}

const value = {
  name: '',
  reps: '',
  weight: ''
}

const exercises = [value]

const initialState: State = {
  user: null,
  currentDay: 1,
  name: '',
  daysCount: '',
  daysExersices: {},
  userSystems: {}
}

const mainReducer = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setDays: (state, action: PayloadAction<string>) => {
      state.daysCount = action.payload

      for (let i = 1; i <= Number(action.payload); i++) {
        state.daysExersices[`day${String(i)}`] = exercises
      }
    },
    incrementCurrentDay: state => {
      state.currentDay = state.currentDay + 1
    },
    decrementCurrentDay: state => {
      state.currentDay = state.currentDay - 1
    },
    cleanStore: state => {
      state.daysExersices = {}
      state.name = ''
      state.daysCount = ''
    },
    setExerciseName: (state, action: PayloadAction<ExerciseInfo>) => {
      state.daysExersices[`day${state.currentDay}`][action.payload.id].name = action.payload.value
    },
    setReps: (state, action: PayloadAction<ExerciseInfo>) => {
      state.daysExersices[`day${state.currentDay}`][action.payload.id].reps = action.payload.value
    },
    setWeight: (state, action: PayloadAction<ExerciseInfo>) => {
      state.daysExersices[`day${state.currentDay}`][action.payload.id].weight = action.payload.value
    },
    addExercise: state => {
      const dayIdentifier = `day${state.currentDay}`
      state.daysExersices[dayIdentifier] = [...state.daysExersices[dayIdentifier], { ...value }]
    },
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload
    },
    setUserSystems: (state, action: PayloadAction<any>) => {
      state.userSystems = action.payload
    }
  },
  extraReducers: {
    [getSystems.fulfilled]: (state, action) => {
      state.userSystems = action.payload
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload
    }
  }
})

export default mainReducer.reducer
export const {
  setName,
  setDays,
  incrementCurrentDay,
  decrementCurrentDay,
  setReps,
  setWeight,
  setExerciseName,
  addExercise,
  setUser,
  cleanStore,
  setUserSystems
} = mainReducer.actions
