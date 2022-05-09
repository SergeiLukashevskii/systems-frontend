import { useEffect } from 'react'
import styles from './App.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SystemCreatingMenu } from './components/systemCreatingMenu/SystemCreatingMenu'
import { Header } from './components/header/Header'
import { Login } from './components/pages/login/Login'
import { Profile } from './components/pages/profile/Profile'
import { SystemsPage } from './components/pages/systemsPage/SystemsPage'
import { getUser } from './http/systemsApi'
import { useTypeDispatch } from './store/store'

const App = () => {
  const dispatch = useTypeDispatch()

  useEffect(() => {                            //systemCreating 94 
    dispatch(getUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path='/creating' element={<SystemCreatingMenu />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/systems' element={<SystemsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
