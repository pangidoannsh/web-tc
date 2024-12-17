import { FC, useState } from "react";

export type PositionDraggable = { x: number; y: number };
interface Props {
    position: PositionDraggable
    children?: React.ReactNode
    onDrag?: (position: PositionDraggable) => void
    onStop?: (position: PositionDraggable) => void
    onStart?: (position: PositionDraggable) => void
    className?: string
    header?: React.ReactNode
    headerClassName?: string
    disable?: boolean
}
const Draggable: FC<Props> = ({ position, children, onDrag, className, onStop, onStart, header, headerClassName, disable = false }) => {
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState<PositionDraggable>({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disable) return
        setDragging(true);
        onStart?.(offset)
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragging || disable) return;
        const newPosition = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        };
        if (onDrag) onDrag(newPosition);
    };

    const handleMouseUp = () => {
        if (disable) return
        setDragging(false);
        onStop?.(offset)
    };

    return (
        <div className={`modal-container ${className}`}
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {/* Header */}
            <div
                className={`w-full min-h-2 ${headerClassName}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {header}
            </div>
            {children}
        </div>
    );
};

export default Draggable;
