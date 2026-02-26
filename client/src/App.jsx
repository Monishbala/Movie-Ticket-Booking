import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Movies from './Pages/Movies.jsx'
import MovieDetails from './Pages/MovieDetails.jsx'
import SeatLayout from './Pages/SeatLayout.jsx'
import MyBookings from './Pages/MyBookings.jsx'
import Favorite from './Pages/Favorite.jsx'
import {Toaster} from "react-hot-toast"
import Footer from './Components/Footer'
import Layout from './Pages/Admin/Layout.jsx'
import Dashboard from './Pages/Admin/Dashboard.jsx'
import AddShows from './Pages/Admin/AddShows.jsx'
import ListShows from './Pages/Admin/ListShows.jsx'
import ListBookings from './Pages/Admin/ListBookings.jsx'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/admin/*' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
              <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
