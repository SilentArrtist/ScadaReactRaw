import { React, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { addDevice, deleteDevice } from '../../http/deviceAPI';
import DataPopUp from './DataPopUp';
import DragAndDropPopUp from './DragAndDropPopUp';
const DevicesPopUp = memo(({isPopUpOpen,togglePopup}) => {
    const user = useSelector(state=>state.user.user)
    const devices = useSelector(state=>state.devices.devices)
    const [ip,setIP] = useState("");
    const [selectedIp,setSelectedIp] = useState("");
    const [isDataPopupOpen,setDataPopupOpen] = useState(false);
    const addDeviceFunc = async () =>{
        if(!user.editMode){alert("Access denied");return;}
        if(devices.length<=1){alert("Only one device allowed");return;}
        try {
            const data = await addDevice(ip);
            alert(data.message);
        } catch (e) { 
            alert(e?.response?.data?.message);
        }
    }
    const deleteDevicesFunction = async(devIp)=>{
        if(!user.editMode){alert("Access denied");return;}
        try {
            const data = await deleteDevice(devIp);
            alert(data.message);
        } catch (e) { 
            alert(e?.response?.data?.message);
        }
    }
    const toggleDataPopUp = function(ip){
        setSelectedIp(ip)
        setDataPopupOpen(!isDataPopupOpen)
    }
    return (
        <DragAndDropPopUp isPopUpOpen={isPopUpOpen} togglePopup = {togglePopup} idName={"devicePopUp_body"}>
            <div id="device_popUpBlock">
                {
                devices.map((device)=>
                <div key={Math.random()} className="devices_block">
                    <p>IP:{device.ip}</p>
                    <div>
                        <button onClick={()=>toggleDataPopUp(device.ip)} className='device_btn'>
                            View 
                        </button>
                        <button onClick={()=>deleteDevicesFunction(device.ip)} className='device_btn'>
                            Delete
                        </button>
                    </div>
                </div>)
                }
            </div>
            <div className="add_device_block">
                <input 
                    className='addDevice_input' 
                    placeholder='IP'
                    value={ip}
                    onChange={(e)=>setIP(e.target.value)} 
                    type="text"
                />
                <button onClick={()=>addDeviceFunc()} className='add_btn'>ADD</button>
            </div>
            <DataPopUp
            isDataPopupOpen = {isDataPopupOpen}
            togglePopup = {setDataPopupOpen}
            ip = {selectedIp} 
            />
        </DragAndDropPopUp>
    );
});

export default DevicesPopUp;