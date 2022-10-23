import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/Register.css'
const InputRegisters = memo(({device,value,number}) => {
    const user = useSelector(state=>state.user.user)
    return (
        <div>
            <div className="registerBox">
                <p>Input Register №{number}:{value}</p>
            </div>
        </div>
    );
});

export default InputRegisters;