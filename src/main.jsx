import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './component/Routes/route'
import Authprovider from './Context/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Authprovider>
     <RouterProvider router={router} />
   </Authprovider>
  </StrictMode>,
)
