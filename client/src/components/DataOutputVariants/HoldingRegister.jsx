import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { changeValue } from '../../http/deviceAPI';
import '../../styles/Register.css'
const HoldingRegister = memo(({device,value,number}) => {
    const user = useSelector(state=>state.user.user)
    const change = async ()=>{
        if(!user.editMode){alert("Access denied");return;}
        try {
            const newValue = prompt("New value:")
            const data = await changeValue(device.ip,"holdingRegisters",number-1,newValue);
            alert(data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
    return (
        <div>
            <div className="registerBox">
                <p>Holding Register №{number}:{value}</p>
                <button onClick={()=>change()}>Change</button>
            </div>
        </div>
    );
});

export default HoldingRegister;