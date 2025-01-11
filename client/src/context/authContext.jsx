import axios from "axios";
import { createContext,useState,useEffect,useContext} from "react";

const AuthContext = createContext()


export const AuthProvider = ({children})=>{

 const [auth,setAuth] = useState({
    user:null,
    token:""
 })

 axios.defaults.headers.common['Authorization'] = auth?.token

 useEffect(()=>{
    const data = localStorage.getItem('auth')
    if(data){
        const pdata = JSON.parse(data)
        setAuth({
            ...auth,
            user: pdata.user,
            token:pdata.token
        })
    }
 },[])



 return(
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
 )
}

export const useAuth =()=>useContext(AuthContext)

