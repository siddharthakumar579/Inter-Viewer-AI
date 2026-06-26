import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth.context";
import { login, logout, register, getme } from "../services/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context

    const handleRegister = async ({username, email, password}) => {

        setLoading(true);
        try {
            const data = await register({username, email, password})
            setUser(data.user);
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false)
        }
    }

    const handleLogin = async ({email, password}) =>{

        setLoading(true);
        try {
            const data= await login ({email, password})
            setUser(data.user);
        } catch (err) {
            console.log(err);
            
        } finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {

        setLoading(true);
        try {
            const data = await logout()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        const getAndSetUser = async () =>{
            const data = await getme()
            setUser(data.user)
            setLoading(false)
        }
        getAndSetUser()
    },[])

    return {user, loading, handleLogin, handleLogout, handleRegister}
}