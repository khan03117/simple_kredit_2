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
import Documents from './page/Documents'
import Login from './page/Login'
import Contact from './page/Contact'
import AuthLayout from './Layout/AuthLayout'
import Dashboard from './page/Dashboard'
import Applications from './page/Applications'
import Banks from './page/Banks'
import Transactions from './page/Transactions'


function App() {
  const ThemeRouts = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/apply' element={<Apply />} />
          <Route path='/loan-application' element={<ApplyLoan />} />
          <Route path='/loan-calculator' element={<LoanCalculater />} />
          <Route path='/policy/:url' element={<Policy />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/document-list' element={<Documents />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/' element={<AuthLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/application' element={<Applications />} />
          <Route path='/bank' element={<Banks />} />
          <Route path='/transactions' element={<Transactions />} />
        </Route>
      </>

    )
  )
  return (
    <>
      <RouterProvider router={ThemeRouts} />
    </>
  )
}

export default App
