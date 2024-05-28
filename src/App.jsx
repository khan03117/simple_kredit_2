import Home from './page/Home'
import './App.css'
import Layout from './Layout'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import About from './page/About'
import Apply from './page/Apply'
import ApplyLoan from './page/ApplyLoan'
import LoanCalculater from './components/LoanCalculater'
import Policy from './page/Policy'
import Faq from './page/Faq'


function App() {
  const ThemeRouts = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/apply' element={<Apply/>} />
        <Route path='/loan-application' element={<ApplyLoan/>} />
        <Route path='/loan-calculator' element={<LoanCalculater/>} />
        <Route path='/policy/:url' element={<Policy/>} />
        <Route path='/faq' element={<Faq/>} />
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
