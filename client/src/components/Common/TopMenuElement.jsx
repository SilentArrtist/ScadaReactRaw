import React, { memo } from 'react';

const TopMenuElement = ({src,alt,title,callback}) => {
    return (
        <div 
        onClick={(e)=>callback(e)}
        >
            <span className='icon'>
                <img src={src} alt={alt} title={title}/>
            </span>
        </div>
    );
};

export default memo(TopMenuElement);