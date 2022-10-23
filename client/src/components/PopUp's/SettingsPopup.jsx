import { React, useState, useEffect, memo } from 'react';
import { useDispatch} from 'react-redux';
import { changeDynamicValueAction, changeOutputAction, changeStyleAction, connectAction, deleteElementAction } from '../../store/reducers/elementsReducer';
import { deleteDevice } from '../../http/deviceAPI';
import MySelector from '../UI/MySelector';
import DragAndDropPopUp from './DragAndDropPopUp';
const SettingsPopup = memo(({isSettingsPopupOpen,togglePopup,element}) => {
    const dispatch = useDispatch()
    const [currentElementStyles,updCurElemStyles] = useState(
    {
        color:"#ffffff",
        background:"#ffffff",
        borderColor:"#ffffff",
        fontWeight:"",
        fontSize:"",
        fontStyle:"",
        width:"",
        height:"",
        borderRadius:"",
        border:false,
        zIndex:"",
    })
    const [currentElementDynamicValue,updCurrentElementDynamicValue] = useState(
    {
        color:"#ffffff",
        borderColor:"#ffffff",
        background:"#ffffff",
        colorValue:"",
        borderColorValue:"",
        backgroundValue:"",
    })
    const updDynamicValue = (style,value) =>{
        const newStyles = JSON.parse(JSON.stringify(currentElementDynamicValue));
        newStyles[style] = value;
        const key = element.key;
        dispatch(changeDynamicValueAction({key, parameter:style, newValue:value}))
        updCurrentElementDynamicValue(newStyles)
    }
    const [borderIsChecked, setBorderIsChecked] = useState(false)
    const checkHandler = () => {
        setBorderIsChecked(!borderIsChecked)
        const newStyles = JSON.parse(JSON.stringify(currentElementStyles));
        const key = element.key;
        newStyles.border = !borderIsChecked;
        const value = borderIsChecked?"none":"";
        dispatch(changeStyleAction({key, parameter:"border", newValue:value}))
        updCurElemStyles(newStyles)
    }
    const [output, setOutput] = useState("")
    const updStyle = (style,value) =>{
        const newStyles = JSON.parse(JSON.stringify(currentElementStyles));
        const key = element.key;
        newStyles[style] = value;
        dispatch(changeStyleAction({key, parameter:style, newValue:value }))
        updCurElemStyles(newStyles)
    }
    const updOutput = (value) =>{
        const key = element.key;
        dispatch(changeOutputAction({key, output:value}))
        dispatch(connectAction({key,ip:null,type:null,index:null}));
    }
    const updZIndex = (val)=>{
        updStyle("zIndex",val);
    }
    const deleteElem = async() =>{
        if(element.connected){
            try {
                const {message} = await deleteDevice(element.ip);
                alert(message);
            } catch (e) {
                alert(e.response.data.message);
            }
            
        }
        dispatch(deleteElementAction(element.key))
    }
    useEffect(()=>{
        updStyle("color",element.style.color);
        updStyle("background", element.style.background)
        updStyle("borderColor",element.style.borderColor)
        updStyle("border",element.style.border)
        updStyle("fontWeight",element.style.fontWeight)
        updStyle("fontSize",element.style.fontSize)
        updStyle("fontStyle",element.style.fontStyle)
        updStyle("width",element.style.width)
        updStyle("height",element.style.height)
        updStyle("borderRadius",element.style.borderRadius)
        updStyle("zIndex",element.style.zIndex)
        if(element.dynamicValue){
            updDynamicValue("backgroundValue",element.dynamicValue.backgroundValue)
            updDynamicValue("background",element.dynamicValue.background)
            updDynamicValue("colorValue",element.dynamicValue.colorValue)
            updDynamicValue("color",element.dynamicValue.color)
            updDynamicValue("borderColorValue",element.dynamicValue.borderColorValue)
            updDynamicValue("borderColor",element.dynamicValue.borderColor)
        }
    },[])
    const toggleSetting = () => {
        const details = document.querySelectorAll('.dt');
        details.forEach(target => {
            target.removeAttribute('open');
        })
    };
    return (
        <DragAndDropPopUp isPopUpOpen={isSettingsPopupOpen} togglePopup = {togglePopup} idName={"settingsPopUp_body"}>
            <div className="popUpBlock">
                <details className = 'dt'>
                <summary onClick={()=>toggleSetting()} className="pop_up_variant">COLOR</summary>
                <div className="info">
                    <div className="paramBlock">
                        <span>Change Background Color</span>
                        <p></p>
                        <input
                        value={currentElementStyles.background}
                        onChange ={(e)=>updStyle("background",e.target.value)}
                        type="color"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Change Border Color</span>
                        <p></p>
                        <input
                        value={currentElementStyles.borderColor}
                        onChange ={(e)=>updStyle("borderColor",e.target.value)}
                        type="color"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Change Text Color</span>
                        <p></p>
                        <input
                        value={currentElementStyles.color}
                        onChange ={(e)=>updStyle("color",e.target.value)}
                        type="color"
                        />
                    </div>
                    <div className="сhecBoxBlock">
                        <span>Border:</span>
                        <span>   </span>
                        <input
                        type="checkbox"
                        id="checkbox"
                        checked={borderIsChecked}
                        onChange={checkHandler}
                        />
                    </div>
                </div>
                </details>
            </div>
            <div className="popUpBlock">
                <details className = 'dt'>
                <summary onClick={()=>toggleSetting()} className="pop_up_variant">DYNAMIC COLORS</summary>
                <div className="info">
                    <div className="paramBlock">
                        <span>Background Color</span>
                        <input
                        value={currentElementDynamicValue.background}
                        onChange ={(e)=>updDynamicValue("background",e.target.value)}
                        type="color"
                        />
                        <input
                        value={currentElementDynamicValue.backgroundValue}
                        className = "dynamicValueInput"
                        placeholder='Condition'
                        onChange ={(e)=>updDynamicValue("backgroundValue",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Border Color</span>
                        <p></p>
                        <input
                        value={currentElementDynamicValue.borderColor}
                        onChange ={(e)=>updDynamicValue("borderColor",e.target.value)}
                        type="color"
                        />
                        <input
                        value={currentElementDynamicValue.borderColorValue}
                        className = "dynamicValueInput"
                        placeholder='Condition'
                        onChange ={(e)=>updDynamicValue("borderColorValue",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Text Color</span>
                        <p></p>
                        <input
                        value={currentElementDynamicValue.color}
                        onChange ={(e)=>updDynamicValue("color",e.target.value)}
                        type="color"
                        />
                        <input
                        value={currentElementDynamicValue.colorValue}
                        className = "dynamicValueInput"
                        placeholder='Condition'
                        onChange ={(e)=>updDynamicValue("colorValue",e.target.value)}
                        type="text"
                        />
                    </div>
                </div>
                </details>
            </div>
                
            <div className="popUpBlock">
                <details className = 'dt'>
                <summary onClick={()=>toggleSetting()} className="pop_up_variant">FONT</summary>
                <div className="info">
                    <div className="paramBlock">
                        <span>Text Weight:</span>
                        <p></p>
                        <input
                        value={currentElementStyles.fontWeight}
                        onChange ={(e)=>updStyle("fontWeight",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Text Size:</span>
                        <p></p>
                        <input
                        value={currentElementStyles.fontSize}
                        onChange ={(e)=>updStyle("fontSize",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Text style:</span>
                        <p></p>
                        <input
                        value={currentElementStyles.fontStyle}
                        onChange ={(e)=>updStyle("fontStyle",e.target.value)}
                        type="text"
                        />
                    </div>
                </div>
                </details>
            </div>

            <div className="popUpBlock">
                <details className = 'dt'>
                <summary onClick={()=>toggleSetting()} className="pop_up_variant">SIZE</summary>
                <div className="info">
                    <div className="paramBlock">
                        <span>Width:</span>
                        <input
                        value={currentElementStyles.width}
                        onChange ={(e)=>updStyle("width",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Height:</span>
                        <input
                        value={currentElementStyles.height}
                        onChange ={(e)=>updStyle("height",e.target.value)}
                        type="text"
                        />
                    </div>
                    <div className="paramBlock">
                        <span>Border Radius:</span>
                        <input
                        value={currentElementStyles.borderRadius}
                        onChange ={(e)=>updStyle("borderRadius",e.target.value)}
                        type="text"
                        />
                    </div>  
                    <div className="paramBlock">
                        <span>Z-Index:</span>
                        <p></p>
                        <div id="selectorBlock">
                        <MySelector className="selector" 
                        optionsArray = {[1,2,3]}
                        value={currentElementStyles.zIndex}
                        setValue={updZIndex}
                        />
                        </div>
                    </div>   
                </div>
                </details>
            </div>

            <div className="popUpBlock">
                <details className = 'dt'>
                <summary onClick={()=>toggleSetting()} className="pop_up_variant">OUTPUT</summary>
                <div className="info">
                    <div className="output_block">
                            <p>Введите текст, который необходимо отобразить</p>
                        <input value = {output} onChange={(e)=>setOutput(e.target.value)} id="outputDataBlockTextArea"  cols="20" rows="5" />
                        <button onClick={()=>updOutput(output)}>Apply</button>    
                    </div>           
                </div>
                </details>
            </div>
            <p className="pop_up_delete" onClick={()=>deleteElem()}>DELETE</p>
        </DragAndDropPopUp>
    );
});

export default SettingsPopup;