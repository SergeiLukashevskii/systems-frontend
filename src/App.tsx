import { useEffect } from 'react'
import styles from './App.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SystemCreatingMenu } from './components/systemCreatingMenu/SystemCreatingMenu'
import { Header } from './components/header/Header'
import { Login } from './components/pages/login/Login'
import { Profile } from './components/pages/profile/Profile'
import { SystemsPage } from './components/pages/systemsPage/SystemsPage'
import { SystemDaysInfo } from './components/pages/systemsPage/components/systemDaysInfo/SystemDaysInfo'
import { SystemExecisesInfo } from './components/pages/systemsPage/components/systemExecisesInfo/SystemExecisesInfo'
import { RequireAuth } from './RequireAuth'
import { getUser } from './http/userApi'
import { useTypeDispatch } from './store/store'

const App = () => {
  const dispatch = useTypeDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Login />} />
          <Route path='/creating' element={<RequireAuth><SystemCreatingMenu /></RequireAuth>} />
          <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path='/systems' element={<RequireAuth><SystemsPage /></RequireAuth>} />
          <Route path='/systems/:systemId' element={<RequireAuth><SystemDaysInfo /></RequireAuth>} />
          <Route path='/systems/:systemId/:dayId' element={<RequireAuth><SystemExecisesInfo /></RequireAuth>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
