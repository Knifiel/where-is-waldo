import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  Route,
} from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './features/redux/store'
import { StyledNavbar } from './routes/Navbar'
import { StyledNotFound } from './routes/NotFound'
import Welcome from './routes/Welcome'
import Game from './routes/Game'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <StyledNavbar />
          <Outlet />
        </>
      }>
      <Route
        path='/'
        element={<Welcome />}
      />
      <Route
        path='/game'
        element={<Game />}
      />
      <Route
        path='/highscores'
        element={<div>Highscores</div>}
      />
      <Route
        path='*'
        element={<StyledNotFound />}
      />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
