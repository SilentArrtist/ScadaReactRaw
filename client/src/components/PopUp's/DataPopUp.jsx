import { useState } from 'react';
import { React, useRef , memo} from 'react';
import {useSelector } from 'react-redux';
import Coils from '../DataOutputVariants/Coils';
import HoldingRegister from '../DataOutputVariants/HoldingRegister';
import InputRegisters from '../DataOutputVariants/InputRegisters';
import DragAndDropPopUp from './DragAndDropPopUp';
const DataPopUp = memo(({isDataPopupOpen,togglePopup,ip}) => {
    const containerRef = useRef();
    const devices = useSelector(state=>state.devices.devices)
    const device = devices.length!==0?devices[0]:null;
    const [currentType,setCurrentType] = useState("");
    return (
        <DragAndDropPopUp isPopUpOpen={isDataPopupOpen} togglePopup = {togglePopup} idName={"dataPopUp_body"}>
            <div className="outputTypes">
                    <div onClick={()=>(setCurrentType("holdingRegisters"))} className="changeType">Holding Registers</div>
                    <div onClick={()=>(setCurrentType("inputRegisters"))} className="changeType">Input Registers</div>
                    <div onClick={()=>(setCurrentType("coils"))} className="changeType">Coils</div>
            </div>
            <div ref = {containerRef} className="container">               
            {
                device&&device.status!==0
                ?
                    currentType==="holdingRegisters"
                    ?
                    device.holdingRegisters.map((register,index)=>
                        <HoldingRegister device = {device} value={register} number={index+1} key={index+1}/>
                    )
                    :
                    currentType==="inputRegisters"
                    ?
                    device.inputRegisters.map((register,index)=>
                        <InputRegisters device = {device} value={register} number={index+1} key={index+1}/>
                    )
                    :
                    currentType==="coils"
                    ?
                    device.coils.map((register,index)=>
                        <Coils device = {device} value={register} number={index+1} key={index+1}/>
                    )
                    :
                    <>aboba</>
                :
                <h1 className='NoConnectionH1'>NO_CONNECTION</h1>
            }
            </div>
        </DragAndDropPopUp>
    );
});

export default memo(DataPopUp);