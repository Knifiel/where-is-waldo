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
import store from './redux/store'
import { StyledNotFound } from './routes/NotFound'
import Game from './routes/Game'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import Root from './routes/Root'
import Highscores from './features/highscores/Highscores'
import Instructions from './features/instructions/Instructions'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path='/'
        element={<Instructions />}
      />
      <Route
        path='/game'
        element={<Game />}
      />
      <Route
        path='/highscores'
        element={<Highscores />}
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
