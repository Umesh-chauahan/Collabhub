import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
 <AuthProvider>
 <BrowserRouter>
    <App />
 </BrowserRouter>
 </AuthProvider>
)
