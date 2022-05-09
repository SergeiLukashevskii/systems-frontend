import { createAsyncThunk } from '@reduxjs/toolkit'
import { authHost } from './index'

export const createSystem = async (name: any, exersices: any) => {
  const { data } = await authHost.post('/systems', { name, exersices })
  return data
}

export const getSystems: any = createAsyncThunk('reducer/getSystems', async () => {
  const { data } = await authHost.get('/systems')
  return data
})

export const getUser: any = createAsyncThunk('reducer/getUser', async (_, {rejectWithValue}) => {
  try {
    const { data } = await authHost.get('/user')
    return data
  } catch(e: any) {
    localStorage.removeItem('/token')
    return rejectWithValue(e.message)
  }
})