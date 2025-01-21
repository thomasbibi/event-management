import { useState } from 'react'
import { Routes, Route } from "react-router";
import './App.css'
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import Events from './pages/Events';
import EventsDetails from './pages/EventsDetails';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Calender from './pages/Calender';

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/edit/:id" element={<EditEvent />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventsDetails />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/calender" element={<Calender />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
