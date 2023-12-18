import { Outlet, useNavigate } from "react-router-dom"
import UseAuth from "../../Hooks/UseAuth"
import { useEffect } from "react"

const ProtectedRoute =()=>{
    let navigate = useNavigate()
    let {auth,setAuth}=UseAuth()
    useEffect(()=>{
        !auth.token && navigate("/login")
    })
    return <Outlet/>
}
export default ProtectedRoute;