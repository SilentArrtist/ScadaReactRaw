import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSave } from '../../http/deviceAPI';
import { addElementAction,addImageAction } from '../../store/reducers/elementsReducer';
import DevicesPopUp from '../PopUp\'s/DevicesPopUp';
import '../../styles/TopMenu.css'
import TopMenuElement from './TopMenuElement';
import MainSettingsPopUp from '../PopUp\'s/MainSettingsPopUp';
const TopMenu = ({topRef,logOut}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const elementsToSave = useSelector(state=>state.elements)
    const icons = useSelector(state=>state.menuIcons.icons)
    const imgRef = useRef();
    const [devicesPopUpOpen,setDevicesPopUpOpen] = useState(false);
    const openDevicesPopUp = function(e){
        e.preventDefault();
        setDevicesPopUpOpen(true);
    }
    const [mainSettingsPopUp,setMainSettingsPopUpOpen] = useState(false);
    const openMainSettingsPopUp = function(e){
        e.preventDefault();
        setMainSettingsPopUpOpen(true);
    }
    const addNewElement =(e)=>{
        e.preventDefault();
        if(!user.editMode){alert("Access denied");return;}
        const newElement =
        {
            key:Math.random()*1000,
            x:null,
            y:null,
            ip:null,
            type:null,
            index:null,
            output:"",
            style:{
                color:"",
                background:"",
                borderColor:"",
                fontWeight:"",
                fontSize:"",
                fontStyle:"",
                width:"",
                height:"",
                borderRadius:"",
                zIndex:"",
                },
            dynamicValue:{
                backgroundValue:"",
                background:"#ffffff",
                colorValue:"",
                color:"#ffffff",
                borderColorValue:"",
                borderColor:"#ffffff",
            }
        }
        dispatch(addElementAction(newElement))
    }
    const addNewIMG = (element)=>{
        if(!user.editMode){alert("Access denied");return;}
        const newIcon =
        {
            key:(Math.random()*100+3)*17,
            x:null,
            y:null,
            src:"null"
        }
        let file = element.target.files[0];
        let reader = new FileReader();
        reader.onloadend = function() {
            newIcon.src = reader.result;
            console.log(reader.result);
            dispatch(addImageAction(newIcon))
            imgRef.current.value = "";
        }
        reader.readAsDataURL(file);
    }
    const saveFunction = async(e)=>{
        if(!user.editMode){alert("Access denied");return;}
        try {
            const data = await setSave(JSON.stringify(elementsToSave));
            alert(data.message);
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }

    return (
        <div className="TopMenuWrapper">
            <div className={'topNav'} ref={topRef}>
                <div className="userInfo">
                <h3>USER:{user.login}</h3>
                <h3>ROLE:{user.role}</h3>
                </div>
                
                <ul>
                    <li className={'listElem'}>
                        <TopMenuElement src={icons.newObject} alt="Add Object" title="Add Object" callback={addNewElement}/>
                    </li>
                    <li className={'listElem'}> 
                        <div>
                            <label className='icon' htmlFor="icon_load">
                                <img src={icons.newImage} alt="Add Image" title="Add Image"/>
                                <input
                                className="img_load"
                                id = 'icon_load'
                                type="file"
                                ref={imgRef}
                                onChange={(e)=>addNewIMG(e)}
                                />
                            </label>
                        </div>
                    </li>
                    <li className={'listElem'}>
                        <TopMenuElement src={icons.devices} alt="Devices" title="Devices" callback={openDevicesPopUp}/>
                    </li>
                    <li className={'listElem'}>
                        <TopMenuElement src={icons.save} alt="Devices" title="Devices" callback={saveFunction}/>
                    </li>
                    <li className={'listElem'}>
                        <TopMenuElement src={icons.settings} alt="Settings" title="Settings" callback={openMainSettingsPopUp}/>
                    </li>
                    <li className={'listElem'}>
                        <TopMenuElement src={icons.logOut} alt="Log Out" title="Log Out" callback={logOut}/>
                    </li>
                </ul>
            </div>
            <MainSettingsPopUp
            isPopUpOpen = {mainSettingsPopUp}
            togglePopup = {setMainSettingsPopUpOpen}
            />
            <DevicesPopUp
             isPopUpOpen = {devicesPopUpOpen}
             togglePopup = {setDevicesPopUpOpen}
             />
        </div>
        
    );
};
export default (TopMenu);