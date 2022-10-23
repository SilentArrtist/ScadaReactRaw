import { useState,React, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectAction } from '../../store/reducers/elementsReducer';
import DragAndDropPopUp from './DragAndDropPopUp';
const ConnectionPopUp = memo(({isConnectionPopUpOpen,togglePopup,element}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const devices = useSelector(state=>state.devices.devicesCopy);
    const device = devices.length!==0?devices[0]:null;
    const typesArr = ["holdingRegisters","inputRegisters","coils"];
    const indexArr = [0,1,2,3,4,5,6,7,8,9];
    const [type,setType] = useState("");
    const [index,setIndex] = useState("");
    const selectType=(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        setType(e.target.value);
    }
    const selectIndex=(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        setIndex(e.target.value);
        dispatch(connectAction({key:element.key,ip:device.ip,type:type,index:e.target.value}));
    }
    return (
        <DragAndDropPopUp isPopUpOpen={isConnectionPopUpOpen} togglePopup = {togglePopup} idName={"connectionPopUp_body"}>
            <div className="connectionBlock">
                <div className="paramBlock">
                    <span>Type:</span>
                    <p></p>
                    <select value = {type} onChange={(e)=>selectType(e)} className="custom_selector">
                        <option id="defValue">Select</option>
                        {
                            typesArr.map((option)=>
                            <option
                            className="selector_option"
                            value={option}
                            key = {Math.random()*13}
                            >{option}</option>)
                        }
                    </select>
                </div>      
                <div className="paramBlock">
                    <span>Index:</span>
                    <p></p>
                    <select value = {index} onChange={(e)=>selectIndex(e)} className="custom_selector">
                        <option id="defValue">Select</option>
                        {
                            indexArr.map((option)=>
                            <option
                            className="selector_option"
                            value={option}
                            key = {Math.random()*13}
                            >{option}</option>)
                        }
                    </select>
                </div>      
            </div>
        </DragAndDropPopUp>
    );
});

export default ConnectionPopUp;
