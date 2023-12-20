import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

// Configurando rotas
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routers/home/home'
import LoginUser from './routers/auth/LoginUser'
import CreateUser from './routers/auth/CreateUser'
import UserPage from './routers/auth/UserPage'
import ErroPage404 from './routers/error/ErroPage404'
import ListAll from './routers/donors/ListAll'
import ListByUser from './routers/collections/ListByUser'
import CreateDonor from './routers/donors/CreateDonor'
import ListDonorbyUser from './routers/donors/ListDonorbyUser';
import AdminPage from './routers/auth/AdminPage'
import AdminLogin from './routers/auth/AdminLogin'
import ListCollectionsactive from './routers/collections/ListCollectionsactive'
import ChatBoot from './components/chatboot/ChatBoot'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <ErroPage404 />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "create-user",
        element: <CreateUser />
      },
      {
        path: "login-user",
        element: <LoginUser />
      },
      {
        path: "user-page",
        element: <UserPage />
      },
      {
        path: "list-all",
        element: <ListAll />
      },
      {
        path: "list-by-user",
        element: <ListByUser />
      },
      {
        path: 'create-donor',
        element: <CreateDonor />
      },
      {
        path: 'list-my-donor',
        element: <ListDonorbyUser />
      },
      {
        path: 'admin-login',
        element: <AdminLogin />
      },
      {
        path: 'admin',
        element: <AdminPage />
      },
      {
        path: 'collections-active',
        element: <ListCollectionsactive />
      },
      {
        path: "chatboot",
        element: <ChatBoot />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
