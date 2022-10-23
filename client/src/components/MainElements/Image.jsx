
import DragAndDrop from './DragAndDrop';
import '../../styles/Image.css'
const Image = ({imgElem}) => {
    return (
        <DragAndDrop class = {"imageContainer"} imgElem = {imgElem} isElement = {false}>
            <img src={imgElem.src} alt="Add Image"/>
        </DragAndDrop>
    );
};
export default Image;