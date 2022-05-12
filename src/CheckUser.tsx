import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useTypeSelector } from './store/store'

export const CheckUser: FC = (prop: any) => {
  const user: any = useTypeSelector(state => state.user)
  const { children } = prop
  let len
  user !== null ? (len = Object.keys(user).length) : (len = null)
  return len ? children : <Navigate to='/login' />
}
