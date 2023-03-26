import React, {useState} from 'react';
import style from './Tools.module.css'

const Tools = ({pen, setPen,clear}) => {

    const testingInput = function(event){
        setPen({...pen, color:event.target.value})
    }

    return (
        <div className={style.tools}>
            <button className={style.decrease} onClick={()=>pen.size>5? setPen({...pen,size: pen.size-5}):''}>-</button>
            <span className={style.size}>{pen.size}</span>
            <button className={style.increase} onClick={()=>pen.size<30? setPen({...pen,size: pen.size+5}):''}>+</button>
                <input type="color" onChange={testingInput}/>
            <button className={style.clear} onClick={clear}>X</button>
        </div>
    );
};

export default Tools;