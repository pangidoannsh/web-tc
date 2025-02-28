export type Role = "ROLE_ADMIN" | "ROLE_USER"
export type NavMenuType = {
    label: string,
    icon: string,
    path: string,
    access?: Role[]
}

export type ChatType = {
    id: string,
    name: string,
    image?: string | null,
    lastMessage: string,
    lastMessageTime: string,
    isUnread: boolean,
    unreadCount?: number
    type?: string
}

export type ChatRoomType = "personal" | "group"

export type MessageType = {
    id: string,
    text: string,
    isSender: boolean,
    path?: string
    time: string,
    isGroupMessage?: boolean
    userName: string
    userImage?: string
}
export type UserType = {
    id: string,
    name: string,
    username: string,
    role: "ROLE_ADMIN" | "ROLE_USER",
    avatar?: string | null
    status: boolean
}

export type FormUserType = {
    name: string,
    username: string,
    password?: string
    confirmPassword?: string
}
export type SessionType = {
    user?: UserType,
    accessToken: string,
    refreshToken?: string,
}

export type GroupType = {
    id: string,
    name: string,
    createdAt: string,
    totalMember: number
    totalTaskDone: number
    totalTaskInProgress: number
    totalTaskTodo: number
    status: boolean
    admin: string
}

export type DetailGroupType = {
    id: string
    name: string
    admin: string
    createdAt: string
    member: string[]
    status: boolean
}

export type FormGroupType = {
    name: string,
    admin: string,
    members: string[]
}

export type TablePaginationType = {
    current: number,
    totalPages: number,
    total: number,
    pageSize: number,
    page: number,
}

export type ChatMessage = {
    id: string;
    chat_room_id: string;
    path?: string;
    sender_id: string;
    sender_name: string;
    recipient_id: string;
    reply_chat_id?: string;
    content: string;
    status: "DELIVERED" | "SENT" | "READ";
    reply_chat_Id: string;
    timestamp: string;
    type: "TEXT" | "IMAGE" | "VIDEO" | "FILE" | "CALL" | "NOTIFICATION";
    reply: boolean;
};

export type ChatRoom = {
    id: string;
    room_id: string;
    avatar: string | null;
    name: string;
    online: boolean;
    type: ChatRoomType;
    unread: number;
    last_message: ChatMessage;
};

export type TypeChat = "TEXT" | "IMAGE" | "VIDEO" | "FILE"

export type ChatMessageType = {
    id: string;
    chat_room_id: string;
    clientChatId: string;
    senderId: string;
    recipientId: string;
    content: string;
    status: "DELIVERED" | "SENT" | "READ" | "FAILED";
    replyChatId: string | null;
    timestamp: string;
    chatRoomId: string;
    type: TypeChat;
    reply: boolean;
}

export type Document = {
    id: string
    name: string
    path: string
    type?: string
    status?: string
}
export type TicketType = {
    id: string
    item: string
    itemType: string,
    description: string,
    status: string,
    createdAt: string,
    createdBy: UserType
    media?: any[]
}

export type TaskBoardColumn = {
    status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CLOSED'
    title: string
}

export type TaskType = {
    id: string
    name: string
    description: string
    group: {
        id: string
        name: string
    },
    members: UserType[]
    documents: Document[]
    status: string
    end_task: string
    end_type: string
    created_at: string
    ticket: TicketType
    assign_type: "ALL" | "MEMBERS" | "PERSONAL"
}

export type FormTicketType = {
    name: string
    type: string
    category: string
    description?: string
    media?: any[]
}

export type FormTaskType = {
    name: string
    end_type: string
    status: string
    assign_type: "ALL" | "MEMBERS" | "PERSONAL"
    group_id: string | null
    members?: string[]
    end_task: string
    description?: string
    documents?: Document[]
}

export type TaskLogType = {
    id: string
    taskId: string
    createdBy: UserType
    description: string
    createdAt: string
}

export type SystemSettingsType = {
    waSupport: boolean
    waLoggedIn: boolean
    waNumber?: string
    waMessageDelay: number
    discordSupport: boolean
    discrodToken: string
}