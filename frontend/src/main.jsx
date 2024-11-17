import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import How_it_Work from './pages/How_it_Work'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LayoutRoute from './pages/Layoutroute'
import Contact from './pages/Contact'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import About from './pages/About'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutRoute/>}>
      <Route index element={<Home/>} />  {/* Home route with 'index' attribute */}
      <Route path="How_it_Work" element={<How_it_Work/>} />
      <Route path='Contact' element={<Contact/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='SignInPage' element={<SignInPage/>}/>
      <Route path="SignUpPage" element={<SignUpPage />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
