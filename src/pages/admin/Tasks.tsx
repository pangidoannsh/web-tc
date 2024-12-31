import { FC, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { FormTaskType, GroupType, TaskBoardColumn, TaskType, UserType } from '../../interfaces';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import TaskBoard from '../../components/tasks/TaskBoard';
import { api } from '../../config/api';
import { jsonToGroupType, jsonToUserType } from '../../utils';
import { TASK_GROUP } from '../../const';
import GroupList from '../../components/tasks/GroupList';
import CreateTask from '../../components/tasks/CreateTask';
import DetailTask from '../../components/tasks/DetailTask';

export const columnBoards: TaskBoardColumn[] = [
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
    },
    {
        status: 'CLOSED',
        title: 'Closed'
    },
]
export const DEFAULT_FORM: FormTaskType = {
    name: '',
    end_type: '',
    assign_type: 'ALL',
    group_id: null,
    end_task: '',
    status: "TODO"
}
type ShowDetailTask = {
    show: boolean
    task: TaskType | null
}
const TasksPage: FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<GroupType>()
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [groups, setGroups] = useState<GroupType[]>([])
    const [groupMembers, setGroupMembers] = useState<UserType[]>([])
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [formAdd, setFormAdd] = useState<FormTaskType>(DEFAULT_FORM)
    const [showDetail, setShowDetail] = useState<ShowDetailTask>({
        show: false,
        task: null
    })

    function _addTask(status: string) {
        setOpenCreateModal(true)
        setFormAdd({ ...DEFAULT_FORM, status, group_id: selectedGroup?.id ?? null })
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
        const draggingTask = tasks.find((task) => task.id === taskId);
        if (draggingTask?.status !== newStatus) {
            api.put(`task/edit-status/${taskId}`, { status: newStatus }).then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
        setTasks(prev =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                    }
                    : task,
            ),
        );
    }

    function handleClickTaskCard(task: TaskType) {
        setShowDetail({
            show: true,
            task
        })
    }

    function createNewData(task: TaskType) {
        setTasks(prev => [...prev, task])
        setOpenCreateModal(false)
    }
    useEffect(() => {
        api.get('group/list').then(res => {
            const resData: any[] = res.data.data.items ?? []
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
            setFormAdd({ ...DEFAULT_FORM, group_id: selectedGroup.id })
            api.get(`task/list?group_id=${selectedGroup.id}&detail=true`).then(res => {
                setTasks(res.data.data ?? [])
            })
            api.get(`group/list/${selectedGroup.id}/users`).then(res => setGroupMembers(res.data.data.map(jsonToUserType))).catch(err => console.log(err))
        }
    }, [selectedGroup])

    return (
        <Layout>
            <div className="p-6 pb-2 px-8 h-full flex flex-col overflow-auto h-scroll">
                <GroupList groups={groups} onSelect={_onSelectGroup} selected={selectedGroup} />
                <div className="flex-1 flex gap-6 overflow-auto w-max">
                    <DndContext onDragEnd={handleDragEnd}>
                        {columnBoards.map(col =>
                            <TaskBoard key={col.status} column={col} tasks={tasks.filter(task => task.status === col.status)}
                                onAddTask={() => _addTask(col.status)} onClickTaskCard={handleClickTaskCard}
                            />
                        )}
                    </DndContext>
                </div>
            </div>
            <CreateTask open={openCreateModal} formValue={formAdd} setFormValue={setFormAdd} onCancel={() => setOpenCreateModal(false)} onCreated={createNewData}
                groupMembers={groupMembers} />
            <DetailTask open={showDetail.show} task={showDetail.task} onClose={() => setShowDetail({ show: false, task: null })} groupId={selectedGroup?.id ?? ""}
                groupMembers={groupMembers} />
        </Layout>
    );
};

export default TasksPage;