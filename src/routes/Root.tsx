import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { reset } from '../redux/gameSlice'
import Navbar from './Navbar'

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Root
