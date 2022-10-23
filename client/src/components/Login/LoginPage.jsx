import React,{ useState }from 'react';
import '../../styles/LoginPage.css'
const LoginPage = ({logIn}) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("")
    const loginFunc = ()=>{
        logIn(login,password);
    }
    return (
        <div className='login-container'>
            <div className="login-form">
                <input 
                    className='login-input' 
                    placeholder='Login'
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)} 
                    type="text" />
                <input 
                    className='login-input' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password" />
                <button onClick={()=>loginFunc()} className='login-btn' >Login</button>
            </div>
            
        </div>
    );
};

export default LoginPage;