import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import MainPage from './pages/MainPage/mainPage'
import Header from './components/particals/header/header'
import Footer from './components/particals/footer/footer'
import EntryPage from './pages/EntryPage/entryPage'
import { updateGradient } from './helper/changeBackgroundGredient.helper'
import { useDispatch } from 'react-redux'

function App() {
  let dispatch = useDispatch()


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
        <Header />

        <div className='body-container'>
          <Routes>
            <Route path='/' element={<MainPage />} />



            <Route path='/entry' element={<EntryPage />} />



          </Routes>
        </div>
        <Footer />
      </Router>

    </>
  )
}

export default App
