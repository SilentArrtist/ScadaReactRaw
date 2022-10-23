import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteImageAction } from '../../store/reducers/elementsReducer';
import ConnectionPopUp from '../PopUp\'s/ConnectionPopUp';
import SettingsPopup from "../PopUp's/SettingsPopup";

const DragAndDrop = (props) => {
    const [settingsPopupState,setSettingsPopupState] =useState(false);
    const [connectPopupState,setConnectPopupState] =useState(false);
    const {isElement} = props;
    const dispatch = useDispatch();
    const element = props?.element;
    const draggableContainer = useRef()
    const positions = {
        clientX: null,
        clientY: null,
        movementX: 0,
        movementY: 0
    };
    const dragMouseDown = function (event) {
        event.preventDefault()
        positions.clientX = event.clientX
        positions.clientY = event.clientY
        document.onmousemove = elementDrag
        document.onmouseup = closeDragElement
    }
    const elementDrag = function (event) {
        event.preventDefault()
        positions.movementX = positions.clientX - event.clientX
        positions.movementY = positions.clientY - event.clientY
        positions.clientX = event.clientX
        positions.clientY = event.clientY
        if((draggableContainer.current)!==null){
            draggableContainer.current.style.top = (draggableContainer.current.offsetTop - positions.movementY) + 'px'
            draggableContainer.current.style.left = (draggableContainer.current.offsetLeft - positions.movementX) + 'px'
            if(isElement){
                element.x = draggableContainer.current.style.left;
                element.y = draggableContainer.current.style.top;
            }
            if(!isElement){
                props.imgElem.x = draggableContainer.current.style.left;
                props.imgElem.y = draggableContainer.current.style.top;
            }
        }
    }
    const closeDragElement = function () {
        document.onmouseup = null
        document.onmousemove = null
    }
    const openSettingsPopUp = function(e){
        e.preventDefault();
        setSettingsPopupState(true);
        if(!isElement){
            dispatch(deleteImageAction(props.imgElem.key))
        }
    }
    const openConnectionsPopUp = function(e){
        e.preventDefault();
        setConnectPopupState(true);
    }
    useEffect(()=>{
        if(isElement&&(typeof (element.style)!=="undefined")){
            draggableContainer.current.style.top = element.y;
            draggableContainer.current.style.left = element.x;
            if(element?.dynamicValue?.colorValue!==""&&element?.dynamicValue?.colorValue!==undefined){
                try {
                    eval(`
                    if(element?.dynamicValue?.colorValue)
                    {
                        draggableContainer.current.style.color = element.dynamicValue.color;
                    }
                    else{
                        draggableContainer.current.style.color = element.style.color;
                    }`
                    )
                } catch (e) {draggableContainer.current.style.color = element.style.color;}
                
            }
            else{
                draggableContainer.current.style.color = element.style.color;
            }
            if(element?.dynamicValue?.backgroundValue!==""&&element?.dynamicValue?.backgroundValue!==undefined){
                try {
                    eval(`
                    if(element?.dynamicValue?.backgroundValue)
                    {
                        draggableContainer.current.style.background = element.dynamicValue.background;
                    }
                    else{
                        draggableContainer.current.style.background = element.style.color;
                    }`
                    )
                } catch (e) {
                    draggableContainer.current.style.background = element.style.background;}
            }
            else{
                draggableContainer.current.style.background = element.style.background;
            }
            if(element?.dynamicValue?.borderColorValue!==""&&element?.dynamicValue?.borderColorValue!==undefined){
                try {
                    eval(`
                    if(element?.dynamicValue?.borderColorValue)
                    {
                        draggableContainer.current.style.borderColor = element.dynamicValue.borderColor;
                    }
                    else{
                        draggableContainer.current.style.borderColor = element.style.color;
                    }`
                    )
                } catch (e) {draggableContainer.current.style.borderColor = element.style.borderColor;}
            }
            else{
                draggableContainer.current.style.borderColor = element.style.borderColor;
            }
            draggableContainer.current.style.border = element.style.border;
            draggableContainer.current.style.fontWeight = element.style.fontWeight;
            draggableContainer.current.style.fontSize = element.style.fontSize;
            draggableContainer.current.style.fontStyle = element.style.fontStyle;
            draggableContainer.current.style.width = element.style.width;
            draggableContainer.current.style.height = element.style.height;
            draggableContainer.current.style.borderRadius = element.style.borderRadius
            draggableContainer.current.style.zIndex = element.style.zIndex;
        }
        else{
            draggableContainer.current.style.top = props.imgElem.y;
            draggableContainer.current.style.left = props.imgElem.x;
        }
    })

    return (
        <div>
            <div
            ref={draggableContainer}
            className={props.class}
            onMouseDown={dragMouseDown}
            onDoubleClick = {(e)=>{openConnectionsPopUp(e)}}
            onContextMenu = {(e)=>openSettingsPopUp(e)}
            >
                {props.children}
            </div>
            {
            isElement
            ?
            <>
            <SettingsPopup
            isSettingsPopupOpen = {settingsPopupState}
            togglePopup = {setSettingsPopupState}
            element = {props.element}
            />
            <ConnectionPopUp
            isConnectionPopUpOpen = {connectPopupState}
            togglePopup = {setConnectPopupState}
            element = {props.element}
            />
            </>
            :
            <></>
            }
           
        </div>
    );
};

export default DragAndDrop;