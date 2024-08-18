import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import { updateGradient } from './helper/changeBackgroundGredient.helper'
import EducationPage from './pages/EducationPage/EducationPage'
import ErrorPage from './pages/ErrorPage/errorPage'
import InventoryPage from './pages/Inventory/InventoryPage'
import LoginPage from './pages/LoginPage/loginPage'
import MainOpenPage from './pages/Main/mainOpenPage'
import MiniGamesPage from './pages/MiniGames/miniGamesPage'
import StatisticPage from './pages/StatisticPage/StatisticPage'
import { AuthService } from './services/auth.service'
import { useAuth, useUpdateDataTrigger } from './store/hooks/useAuth'
import { login, logout } from './store/user/user.slice'


function App() {
  const dispatch = useDispatch()
  const isAuth = useAuth()
  let userTrigger = useUpdateDataTrigger()

  const checkAuth = async () => {
    console.log('Checking Auth Service...');
    // if(!isAuth && window.location.pathname != '/entry/login') {
    //   return window.location.href = '/entry/login'
    // }
    try {
      const data = await AuthService.getProfile()
      if (data) {
        dispatch(login(data))
      }
      else {
        dispatch(logout())
        console.log('Login Failed')
        

      }
    } catch (error) {
      console.log(error)

    }
  }

  useEffect(() => {
    checkAuth()
  }, [userTrigger])


  useEffect(() => {
    let changeGradientTimer = setInterval(() => {
      updateGradient()
    }, 50);

    return () => {
      clearInterval(changeGradientTimer)
    }
  }, [])




  return (
    <>


      <Router>
        <Routes>
          <Route index path='/' element={<MainOpenPage />} />

          <Route exact path='/entry/*' element={<LoginPage />} />


          <Route exact path='/inventory' element={<InventoryPage />} />
          <Route exact path='/miniGames/*' element={<MiniGamesPage />} />
          <Route exact path='/statistic/*' element={<StatisticPage />} />


          <Route exact path='/education/*' element={<EducationPage />} />





          <Route path='*' element={<ErrorPage />} />
        </Routes>

        {/* <Footer /> */}
      </Router>

    </>
  )
}

export default App
