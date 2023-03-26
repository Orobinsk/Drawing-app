import React, {useRef, useState} from 'react';
import style from './Canvas.module.css'
import Tools from "./Tools";

const Canvas = () => {

    const [pen, setPen] = useState({x: '', y: '', size: 20, color: '#000000'})
    const [pressed, setPressed] = useState(false)
    const canvasRef = useRef(null)

    const mouseDown = function (e) {
        drawCircle(e)
        setPressed(true)

        draw(e)
    }
    const draw = function (e) {
        if (pressed) {
            drawCircle(e)
            drawLine(e)
        }
    }
    const drawCircle = function (e) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.beginPath();
        context.arc(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, pen.size, 0, Math.PI * 2, false)
        context.fillStyle = pen.color
        context.fill()
        setPen({...pen, x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop})
    }

    const drawLine = function (e) {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.beginPath();
        context.moveTo(pen.x, pen.y)
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        context.strokeStyle = pen.color
        context.lineWidth = pen.size * 2
        context.stroke()
    }


    const mouseUp = function () {
        setPressed(false)
    }


    const clear = function () {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }


    return (
        <div className={style.canvasBox}>
            <canvas
                className={style.canvas}
                ref={canvasRef}
                onMouseDown={mouseDown}
                onMouseMove={draw}
                onMouseUp={mouseUp}
                width="600"
                height="400"
            ></canvas>
            <Tools
                pen={pen}
                setPen={setPen}
                clear={clear}
            />
        </div>
    );
};

export default Canvas;