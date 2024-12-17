import { FC, useEffect, useState } from 'react';
import Draggable, { PositionDraggable } from '../../lib/Draggable';
import "../../styles/modal.css"

interface Props {
    open: boolean
    fullScreen?: boolean
    header?: React.ReactNode
    children?: React.ReactNode
    className?: string
    draggable?: boolean
    defaultPosition?: PositionDraggable
}

const windowWidth = window.innerWidth
const DEFAULT_POS: PositionDraggable = { x: 0, y: 0 }
const RIGHT_POS = { x: windowWidth > 1280 ? (windowWidth / 1.5) : (windowWidth / 2.5), y: 0 }

const ModalDraggable: FC<Props> = ({ open, fullScreen = false, draggable = true, header, children, className, defaultPosition }) => {
    const [isDrag, setIsDrag] = useState(false)
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState<PositionDraggable>(defaultPosition ?? RIGHT_POS)

    useEffect(() => {
        if (open) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => {
                setPosition(RIGHT_POS)
                setVisible(false)
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [open]);

    if (!visible && !open) return null;

    return (
        <Draggable
            position={fullScreen ? DEFAULT_POS : position}
            onStart={() => setIsDrag(true)}
            onStop={() => setIsDrag(false)}
            onDrag={setPosition}
            className={`p-10 flex flex-col items-center top-0 left-0
                ${className}
                ${open ? 'fade-in' : 'fade-out'}
                ${fullScreen ? "w-full h-full" : "xl:w-[430px] xl:h-[530px]"} 
                ${!isDrag ? "duration-300" : ""}`}
            header={header}
            disable={!draggable}
        >
            {children}
        </Draggable>
    );
};

export default ModalDraggable;