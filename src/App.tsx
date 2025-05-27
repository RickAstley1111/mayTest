import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout/Layout'
import SignUp from './Pages/Auth/SignUp'
import SignIn from './Pages/Auth/SignIn'
import HomePage from './Pages/homePage/HomePage'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />
    },
    {
      path: "/signUp",
      element: <SignUp />
    }, 
    {
      path:"/signIn",
      element:<SignIn/>
    },{
      path:"/homePage",
      element:<HomePage/>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
