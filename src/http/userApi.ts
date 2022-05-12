import jwt_decode from 'jwt-decode'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authHost,host } from './index'

export const registration = async (email: string, password: string) => {
  const { data } = await host.post('/user/register', { email, password, role: 'ADMIN' })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
  const { data } = await host.post('/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getUser = createAsyncThunk('reducer/getUser', async (_, {rejectWithValue}) => {
  try {
    const { data } = await authHost.get('/user')
    return data
  } catch(e: any) {                             
    localStorage.removeItem('/token')
    return rejectWithValue(e.message)
  }
})