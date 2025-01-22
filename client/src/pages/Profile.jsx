import React from 'react'
import ErrorPage from './ErrorPage'
import Header from '../components/Profile/Header'
import { useSelector } from 'react-redux'
import YourPodcast from '../components/Profile/YourPodcast'

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <div>
      {
        isLoggedIn ? (
          <>
            <Header />
            <YourPodcast />
          </>
        ) : (
          <ErrorPage />
        )
      }
    </div>
  )
}

export default Profile