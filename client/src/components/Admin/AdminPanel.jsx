import React, { useState,useEffect } from 'react';
import { deleteUserFunction, getAllUsers, registrationFunction } from '../../http/userAPI';
import '../../styles/AdminPanel.css'
const AdminPanel = ({logOut}) => {
    const [users,setUsers] = useState([]);
    const [login, setLogin] = useState("");
    const [role,setRole] = useState("OPERATOR")
    const [password, setPassword] = useState("")
    useEffect(()=>{
        try {
            getAllUsers().then(data=>{
                setUsers(data.data);
            })
          } catch (e) {
            alert(e?.response?.data?.message)
          }
    },[])
    const regFunc = async()=>{
        try {
            const response = await registrationFunction(login,password,role)
            setUsers(response.data);
        } catch (e) {
          alert(e)
        }
        
    }
    const deleteFunc = async(login)=>{
        if(login === "admin")return;
        try {
            const response = await deleteUserFunction(login)
            setUsers(response.data);
        } catch (e) {
    
          alert(e.response.data.message)
        }
        
    }
    return (
        <div className="admin_panel_container">
            <div className="users_container">
            {
                users.map((user)=>
                    <div key={user.id} className="user_block">
                        <p>Login:{user.login}</p>
                        <p>Role:{user.role}</p>
                        <button
                        className='delete_btn'
                        onClick={()=>deleteFunc(user.login)}
                        >
                        Delete
                        </button>
                    </div>
                )
            }
            <div className="add_user_block">
                <input 
                    className='add-input' 
                    placeholder='Login'
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)} 
                    type="text"
                    />
                <input 
                    className='add-input' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password"
                    />
                <div className="add_selector">
                    <select value={role} onChange={(e)=>setRole(e.target.value)} name="" id="">
                        <option value="EDITOR">EDITOR</option>
                        <option value="OPERATOR">OPERATOR</option>
                    </select>
                </div>
               
                <button onClick={()=>regFunc()} className='login-btn' >ADD</button>
            </div>
            
            </div>
            <div className="logout_box">
                <button
                className='logout_btn'
                onClick={()=>logOut()}
                >
                    Log Out
                </button>
            </div>
            
        </div>
    );
};

export default AdminPanel;