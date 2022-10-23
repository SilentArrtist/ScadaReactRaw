import {useEffect,memo} from 'react';
import {useSelector,useDispatch } from 'react-redux';
import { changeOutputAction } from '../../store/reducers/elementsReducer';
import DragAndDrop from './DragAndDrop';
import '../../styles/Element.css'

const Element = memo(({element}) => {
    const dispatch = useDispatch();
    const devices = useSelector(state=>state.devices.devices)
        useEffect(() => {
        if(element.ip!==null&&element.type!==null&&element.index!==null){
            const tempArr = devices.filter(el=>el.ip===element.ip);
            if(tempArr.length!==0){
                const newOutput = tempArr[0][element.type][element.index];
                if(newOutput==="NO_CONNECTION"){
                    dispatch(changeOutputAction({key:element.key,output:"err"}))
                }
                else{dispatch(changeOutputAction({key:element.key,output:newOutput}))}
            }
            else{
                dispatch(changeOutputAction({key:element.key,output:"err"}))
            }
        }
    })
    return (
        <DragAndDrop class = {"elementContainer"} element = {element} isElement = {true}>
            <div>  
                {element.output}
            </div>
        </DragAndDrop>
    );
});
export default Element;