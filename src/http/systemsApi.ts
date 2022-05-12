import { createAsyncThunk } from '@reduxjs/toolkit'
import { authHost } from './index'
import { DaysExercisesInterface } from '../store/mainReducer'

export const createSystem = async (name: string, exercises: DaysExercisesInterface) => {
  const { data } = await authHost.post('/systems', { name, exercises })
  return data
}

export const getSystems = createAsyncThunk('reducer/getSystems', async () => {
  const { data } = await authHost.get('/systems')
  return data
})
