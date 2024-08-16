import { useEffect, useState } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes, useHref, useNavigate } from 'react-router-dom'
import './App.scss'
import { updateGradient } from './helper/changeBackgroundGredient.helper'
import { useDispatch } from 'react-redux'
import MainOpenPage from './pages/Main/mainOpenPage'
import LoginPage from './pages/LoginPage/loginPage'
import { AuthService } from './services/auth.service'
import { login, logout, updateData } from './store/user/user.slice'
import MiniGamesPage from './pages/MiniGames/MiniGamesPage/miniGamesPage';
import StatisticPage from './pages/StatisticPage/StatisticPage';
import ErrorPage from './pages/ErrorPage/errorPage';
import InventoryPage from './pages/Inventory/InventoryPage';
import EducationPage from './pages/EducationPage/EducationPage'
import { useAuth, useUpdateDataTrigger } from './store/hooks/useAuth'


function App() {
  const dispatch = useDispatch()
  const isAuth = useAuth()
  let userTrigger = useUpdateDataTrigger()

  const checkAuth = async () => {
    console.log('Checking Auth Service...');
    console.log(isAuth)
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
