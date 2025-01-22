import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import AuthLayout from './layout/AuthLayout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Profile from './pages/Profile'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { authActions } from './store/Auth/auth'
import AddPodcast from './pages/AddPodcast'
import AllPodcasts from './pages/AllPodcasts'
import CategoriesPage from './pages/CategoriesPage'
import DescriptionPage from './pages/DescriptionPage'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async() => {
      try {
        const response = await axios.get("https://podcaster-lime-seven.vercel.app/api/v1/users/check-cookie", {withCredentials: true})
        if(response.data.message){
          dispatch(authActions.login())
          toast.success(response.data.message)
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetch()
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-podcast" element={<AddPodcast />} />
          <Route path="all-podcasts" element={<AllPodcasts />} />
          <Route path='/categories/:cat' element={<CategoriesPage />} />
          <Route path='/description/:id' element={<DescriptionPage />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App