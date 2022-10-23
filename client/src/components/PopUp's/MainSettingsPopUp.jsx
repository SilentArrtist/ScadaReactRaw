import { useEffect } from 'react';
import { React, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSettignsAction } from '../../store/reducers/elementsReducer';
import DragAndDropPopUp from './DragAndDropPopUp';
const MainSettingsPopUp = memo(({isPopUpOpen,togglePopup}) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.user)
    const settings = useSelector(state=>state.elements.settings)
    const [currentElementStyles,updCurElemStyles] = useState(
    {
        mainBackground:"#ffffff",
        topBackground:"#ff1fff",
    })
    const updStyle = (style,value) =>{
        if(!user.editMode){alert("Access denied");return;}
        const newStyles = JSON.parse(JSON.stringify(currentElementStyles));
        newStyles[style] = value;
        dispatch(setSettignsAction(newStyles))
        updCurElemStyles(newStyles)
    }
    useEffect(()=>{
        updStyle("topBackground", settings.topBackground)
        updStyle("mainBackground", settings.mainBackground)
    },[])
   
    return (
        <DragAndDropPopUp isPopUpOpen={isPopUpOpen} togglePopup = {togglePopup} idName={"settingsPopUp_body"}>
            <div className="popUpBlock">
                <div className="info">
                    <div className="paramBlock">
                        <span>Change Main Background Color</span>
                        <p></p>
                        <input
                        value={currentElementStyles.mainBackground}
                        onChange ={(e)=>updStyle("mainBackground",e.target.value)}
                        type="color"
                        />
                    </div>
                    <hr/>
                    <div className="paramBlock">
                        <span>Change Top Background Color</span>
                        <p></p>
                        <input
                        value={currentElementStyles.topBackground}
                        onChange ={(e)=>updStyle("topBackground",e.target.value)}
                        type="color"
                        />
                    </div>
                </div>
            </div>
        </DragAndDropPopUp>
    );
});

export default MainSettingsPopUp;