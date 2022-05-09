import { $authHost, $host } from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email?: string, password?: string) => {
  const { data } = await $host.post('api/user/register', { email, password, role: 'ADMIN' }) // получаем токен
  localStorage.setItem('token', data.token) // пушим токен в localstorage
  return jwt_decode(data.token) // преобразуем токен в объект с информацией о пользователе
}

export const login = async (email?: string, password?: string) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const createSystem = async (name: any, exersices: any) => {
  const { data } = await $authHost.post('api/systems', { name, exersices })
  return data
}
