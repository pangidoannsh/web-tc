import { FC } from 'react';
import { TaskBoardColumn, TaskType } from '../../interfaces';
import { Icon } from '@iconify/react/dist/iconify.js';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';

interface Props {
    column: TaskBoardColumn
    tasks: TaskType[]
    onAddTask: () => void
    onClickTaskCard?: (task: TaskType) => void
}
const TaskBoard: FC<Props> = ({ column, tasks, onAddTask, onClickTaskCard }) => {

    const { setNodeRef, isOver } = useDroppable({
        id: column.status,
    });

    const { status } = column
    const boardStyle = status === "TODO" ? "primary" : status === "IN_PROGRESS" ? "warning" : status === "DONE" ? "success" : "gray"

    return (
        <div className={`task-board p-4 pe-0 rounded-md w-96 shadow self-start flex flex-col max-h-full bg-[#F6F8FB] duration-75
         ${boardStyle} ${isOver ? " ring ring-sky-100" : ""}`} >
            <div className="flex-shrink-0 pe-4 flex justify-between items-center">
                <h5 className='text-primary-900 font-bold'>{column.title}</h5>
                <button>
                    <Icon icon="ri:more-fill" />
                </button>
            </div>
            <div ref={setNodeRef} className="flex-1 py-1 flex flex-col gap-3 v-scroll task-scroll overflow-auto mt-1">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onClick={() => onClickTaskCard?.(task)} />
                ))}
            </div>
            <button onClick={onAddTask}
                className="stickty bottom-0 flex-shrink-0 me-4 flex items-center p-2 gap-2 hover:bg-slate-200 duration-200 rounded mt-1">
                <Icon icon="ic:round-plus" className='text-slate-500 text-lg' />
                <div className='text-sm text-slate-500 font-semibold'>Add Task</div>
            </button>
        </div>
    );
};

export default TaskBoard;