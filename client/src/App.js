import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import About from './pages/about/About.jsx'
import Cancel from './pages/cancel/Cancel.jsx'
import Success from './pages/success/Success.jsx'

import Login from './pages/login/Login.jsx'
import Register from './pages/register/Register.jsx'

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>,
    children: [{
      path: '/',
      element: <Home />
    }, {
      path: '/cart',
      element: <Cart />
    }, {
      path: '/cancel',
      element: <Cancel />
    }, {
      path: '/success',
      element: <Success />
    }]
  }])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
