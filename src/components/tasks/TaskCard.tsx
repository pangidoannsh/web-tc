import { FC } from 'react';
import { TaskType } from '../../interfaces';
import { useDraggable } from '@dnd-kit/core';

interface Props {
    task: TaskType
    onClick?: () => void
}
const TaskCard: FC<Props> = ({ task, onClick }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const showDragEffect = () => transform && (transform.x != 0 || transform.y != 0)

    return (
        <div className="relative">
            <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                onMouseUp={transform === null ? onClick : () => { }}
                className='bg-white rounded p-3 me-4 shadow z-50'>
                <div className='font-semibold text-sm'>{task.name !== "" ? task.name : <span className='text-slate-500'>(No Name)</span>}</div>
            </div>
            <div
                style={transform
                    ? {
                        position: 'fixed',
                        width: "352px",
                        transform: `translate(${transform.x}px, ${transform.y - 32}px) rotate(3deg)`,

                    }
                    : undefined}
                className={`bg-white rounded p-3 me-4 shadow z-50 opacity-80 ${!showDragEffect() ? "hidden" : ""}`}>
                <div className='font-semibold text-sm'>{task.name}</div>
            </div>
        </div>
    );
};

export default TaskCard;