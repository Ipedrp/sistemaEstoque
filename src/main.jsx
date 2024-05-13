import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/home.jsx'
import LoginAdm from './components/LoginAdm.jsx'
import CadastroAdm from './components/CadastroAdm.jsx'
import './index.css'

//1- Configurando router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AreaAdm from './components/AreaAdm.jsx'
import CadastroProdutos from './components/CadastroProdutos.jsx'
import VerProdutos from './components/VerProdutos.jsx'
import Vender from './components/Vender.jsx'
import { Calendario } from './components/Calendario.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "loginAdm",
    element: <LoginAdm/>,
  },
  {
    path: "cadastroAdm",
    element: <CadastroAdm/>
  },
  {
    path:"areaAdm",
    element: <AreaAdm/>
  },
  {
   path: "cp",
   element: <CadastroProdutos/>
  },
  {
    path: "vp",
    element: <VerProdutos/>
  },
  {
    path:"vvp",
    element: <Vender/>
  },
  {
    path:"calendario",
    element: <Calendario/>
  }
  
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>,
)
