import Home from './page/Home'
import './App.css'
import Layout from './Layout'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import About from './page/About'
import Apply from './page/Apply'


function App() {
  const ThemeRouts = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/apply' element={<Apply/>} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={ThemeRouts} />
    </>
  )
}

export default App
