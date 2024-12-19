import { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import "moment/locale/id";
import { GroupType, TaskBoardColumn, TaskType } from '../../interfaces';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import TaskBoard from '../../components/tasks/TaskBoard';
import { api } from '../../config/api';
import { jsonToGroupType } from '../../utils';
import { TASK_GROUP } from '../../const';
import GroupList from '../../components/tasks/GroupList';

const columnBoards: TaskBoardColumn[] = [
    {
        status: 'TODO',
        title: 'To Do'
    },
    {
        status: 'IN_PROGRESS',
        title: 'In Progress'
    },
    {
        status: 'DONE',
        title: 'Done'
    }
]

const TasksPage: FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<GroupType>()
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [groups, setGroups] = useState<GroupType[]>([])

    function _addTask(status: string) {
        console.log(status);

    }
    function _onSelectGroup(group: GroupType) {
        localStorage.setItem(TASK_GROUP, group.id)
        setSelectedGroup(group)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as TaskType['status'];

        setTasks(() =>
            tasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                    }
                    : task,
            ),
        );
    }
    useEffect(() => {
        api.get('group/list').then(res => {
            const resData: any[] = res.data.data.items
            setGroups(resData.map(jsonToGroupType))
            const cacheGroupId = localStorage.getItem(TASK_GROUP)

            if (resData.length > 0) {
                const defaultGroup = resData[0];
                const group = jsonToGroupType(cacheGroupId
                    ? resData.find(group => group.id === cacheGroupId)
                    : defaultGroup);
                setSelectedGroup(group ?? defaultGroup);
            }
        })
    }, [])

    useEffect(() => {
        if (selectedGroup) {
            api.get(`group/${selectedGroup.id}/tasks`).then(res => {
                setTasks(res.data.data.items)
            })
        }
    }, [selectedGroup])

    return (
        <Layout>
            <div className="p-6 pb-2 px-8 h-full flex flex-col overflow-visible">
                <GroupList groups={groups} onSelect={_onSelectGroup} selected={selectedGroup} />
                <div className="flex-1 flex gap-6 overflow-hidden">
                    <DndContext onDragEnd={handleDragEnd}>
                        {columnBoards.map(col =>
                            <TaskBoard key={col.status} column={col} tasks={tasks.filter(task => task.status === col.status)}
                                onAddTask={() => _addTask(col.status)}
                            />
                        )}
                    </DndContext>
                </div>
            </div>
        </Layout>
    );
};

export default TasksPage;