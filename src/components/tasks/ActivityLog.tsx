import { FC, useState } from 'react';
import Avatar from '../ui/Avatar';
import { useSession } from '../../providers/SessionProvider';
import MessageInput from '../chat/MessageInput';
import { TaskLogType } from '../../interfaces';
import dayjs from 'dayjs';

interface Props {
    className?: string
}
const ActivityLog: FC<Props> = ({ className }) => {
    const { session } = useSession()
    const [logs] = useState<TaskLogType[]>([{
        id: "1",
        taskId: "1",
        createdAt: "2022-01-01",
        createdBy: session?.user!,
        description: "Task created"
    }])
    const [commentText, setCommentText] = useState("")

    function handleSubmitNewLog() {
        console.log(commentText);
    }
    return (
        <div className={className}>
            <h6 className='font-medium text-sm text-slate-900 mt-10 mb-3'>Activity</h6>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="flex-shrink-0">
                        <Avatar name={session?.user?.name ?? ""} imageUrl={session?.user?.avatar ?? null} size={32} borderRadius={6} />
                    </div>
                    <MessageInput value={commentText} setValue={setCommentText} onSubmit={handleSubmitNewLog} />
                </div>
                {logs.map(log => (
                    <div key={log.id} className="flex gap-2 items-center">
                        <div className="flex-shrink-0">
                            <Avatar name={log.createdBy.name} imageUrl={log.createdBy.avatar} size={32} borderRadius={6} />
                        </div>
                        <div className="flex-1">
                            <div className='text-slate-600 text-sm'>
                                <span className='text-slate-700 font-bold me-1'>{log.createdBy.name}</span>
                                {log.description}
                            </div>
                            <div className='text-xs text-slate-500'>{dayjs(log.createdAt).format("MMM DD, YYYY HH:mm")}</div>
                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    );
};

export default ActivityLog;