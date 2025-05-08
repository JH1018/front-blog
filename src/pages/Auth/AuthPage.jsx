import React, {useState} from 'react'
import { Login, Register } from '../../components/settings'

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleAuthPageToggle = () =>{
        setIsLogin((prevState) => !prevState)
    }
    return (
        <div>
            {isLogin?(
                <Login switchAuthHandler={handleAuthPageToggle}/>
            ): (
                <Register switchAuthHandler={handleAuthPageToggle}/>
            )}
        </div>
    )
}
