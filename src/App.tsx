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
import { getUser } from './http/userApi'
import { useTypeDispatch } from './store/store'
import { CheckUser } from './CheckUser'

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
          {/* <CheckUser> */}
          <Route path='/creating' element={<SystemCreatingMenu />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/systems' element={<SystemsPage />} />
          <Route path='/systems/:systemId' element={<SystemDaysInfo />} />
          <Route path='/systems/:systemId/:dayId' element={<SystemExecisesInfo />} />
          {/* </CheckUser> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
