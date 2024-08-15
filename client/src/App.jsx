import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import './App.scss'
import { updateGradient } from './helper/changeBackgroundGredient.helper'
import { useDispatch } from 'react-redux'
import MainOpenPage from './pages/Main/mainOpenPage'
import LoginPage from './pages/LoginPage/loginPage'
import { AuthService } from './services/auth.service'
import { login } from './store/user/user.slice'
import MiniGamesPage from './pages/MiniGames/MiniGamesPage/miniGamesPage';
import StatisticPage from './pages/StatisticPage/StatisticPage';
import ErrorPage from './pages/ErrorPage/errorPage';
import InventoryPage from './pages/Inventory/InventoryPage';
import EducationPage from './pages/EducationPage/EducationPage'


function App() {
  const dispatch = useDispatch()

  const checkAuth = async () => {
    console.log('Checking Auth Service...');
    try {

      const data = await AuthService.getProfile()
      console.log(data)

      if (data) {
        dispatch(login(data))
      }
      else {
        dispatch(logout())
        console.log('Login Failed')
        window.location.href = '/login'

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


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
