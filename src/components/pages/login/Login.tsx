import { useState } from 'react'
import styles from './Login.module.scss'
import { TextField, Button } from '@mui/material'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useTypeDispatch } from '../../../store/store'
import { login, registration } from '../../../http/userApi'
import { setUser } from '../../../store/mainReducer'

export const Login = () => {
  const isLogin = useLocation().pathname === '/login'
  const dispatch = useTypeDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const handleSetUser = async () => {
    try {
      let data: any = null
      if (isLogin) {
        data = await login(email, password)
        dispatch(setUser(data))
      } else {
        data = await registration(email, password)
        dispatch(setUser(data))
      }
      navigate('/profile')
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.textFieldContainer}>
        <TextField
          label='EMail'
          variant='outlined'
          className={styles.input}
          value={email}
          onChange={handleChangeEmail}
        />
        <TextField
          label='Password'
          variant='outlined'
          className={styles.input}
          value={password}
          onChange={handleChangePassword}
          type='password'
        />
        {isLogin ? (
          <Link style={{ marginTop: 130, textDecoration: 'none' }} to={'/registration'}>
            <Button
              className={styles.nextButton}
              onClick={() => {
                setEmail('')
                setPassword('')
              }}
            >
              sign up
            </Button>
          </Link>
        ) : (
          ''
        )}
      </div>
      {isLogin ? (
        <>
          <Button className={styles.nextButton} onClick={handleSetUser} variant='contained'>
            login
          </Button>
        </>
      ) : (
        <Button className={styles.nextButton} onClick={handleSetUser} color='secondary' variant='contained'>
          sign up
        </Button>
      )}
    </div>
  )
}
