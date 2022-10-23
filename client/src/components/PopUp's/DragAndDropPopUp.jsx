import { React, useRef, memo } from 'react';
import '../../styles/PopUp.css'
const DragAndDropPopUp = memo((props) => {
    const {isPopUpOpen,togglePopup,idName} = props;
    const draggablePopUp = useRef();
    const positions = {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0
    }
    const togglePopUpFunction = function(e){
        e.preventDefault();
        togglePopup(!isPopUpOpen)
    }
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
        draggablePopUp.current.style.top = (draggablePopUp.current.offsetTop - positions.movementY) + 'px'
        draggablePopUp.current.style.left = (draggablePopUp.current.offsetLeft - positions.movementX) + 'px'
    }
    const closeDragElement = function () {
        document.onmouseup = null
        document.onmousemove = null
    }
    return (
        <div id = 'pop_up' className={!isPopUpOpen?"pop_up":"pop_up active"} onClick={(e)=>togglePopUpFunction(e)}>
            <div className="pop_up_body" id={idName} ref={draggablePopUp} onClick = {(e)=>e.stopPropagation()} >
                {props.children}
                <div className = 'pop_up_move' onMouseDown={dragMouseDown}>
                    <p>PULL TO MOVE</p>
                </div>
                
            </div>
        </div>
    );
});

export default DragAndDropPopUp