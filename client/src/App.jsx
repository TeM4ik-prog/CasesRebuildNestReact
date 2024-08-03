import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.scss'
import MainPage from './pages/MainPage/mainPage'
import Header from './components/particals/header/header'
import Footer from './components/particals/footer/footer'
import EntryPage from './pages/EntryPage/entryPage'

function App() {


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
