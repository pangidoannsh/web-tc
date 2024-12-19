import { FC } from 'react';
import { TaskType } from '../../interfaces';
import { useDraggable } from '@dnd-kit/core';

interface Props {
    task: TaskType
}
const TaskCard: FC<Props> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={transform
                ? {
                    position: 'fixed',
                    width: "352px",
                    transform: `translate(${transform.x}px, ${transform.y}px) rotate(3deg)`,
                }
                : undefined}
            draggable
            className='bg-white rounded p-3 me-4 shadow z-50'>
            <div className='font-semibold text-sm'>{task.name}</div>
        </div>
    );
};

export default TaskCard;