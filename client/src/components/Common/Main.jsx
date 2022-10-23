import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Element from '../MainElements/Element';
import Image from '../MainElements/Image';
import '../../styles/Main.css'
const Main = ({mainRef}) => {
    const elements = useSelector(state=>state.elements.elements)
    const images = useSelector(state=>state.elements.images)
    return (
        <div
        className='main'
        ref={mainRef}
        >
            {
                elements.map((element)=>
                    <Element element ={element} key={element.key}/>
                )
            }
            {
                images.map((img)=>
                    <Image imgElem ={img} key={img.key}/>
                )
            }
        </div>
    );
};

export default Main;