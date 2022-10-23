import React, { memo } from 'react';
import '../../styles/MySelector.css'
const MySelector = memo(({value,setValue,optionsArray}) => {
    const changeSelect=(e)=>{
        setValue(e.target.value)
    }
    return (
        <select value = {value} onChange={(e)=>changeSelect(e)} className="custom_selector">
            <option id="defValue"   >Select</option>
            {
                optionsArray.map((option,index)=>
                <option
                className="selector_option"
                value={option}
                key = {Math.random()*13}
                >{option}</option>)
            }
        </select>
    );
});

export default MySelector;

