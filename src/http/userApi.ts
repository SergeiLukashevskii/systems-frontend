import { host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email?: string, password?: string) => {
  const { data } = await host.post('/user/register', { email, password, role: 'ADMIN' }) // получаем токен
  localStorage.setItem('token', data.token) // пушим токен в localstorage
  return jwt_decode(data.token) // преобразуем токен в объект с информацией о пользователе
}

export const login = async (email?: string, password?: string) => {
  const { data } = await host.post('/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}