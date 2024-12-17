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

export type MessageType = {
    id: string,
    text: string,
    isSender: boolean,
    time: string,
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
    member: string[]
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
    clientChatId: string;
    senderId: string;
    recipientId: string;
    content: string;
    status: "DELIVERED" | "SENT" | "READ";
    replyChatId: string;
    timestamp: string;
    chatRoomId: string;
    type: "TEXT" | "IMAGE" | "VIDEO" | "FILE";
    reply: boolean;
};

export type ChatRoom = {
    id: string;
    chatRoomId: string;
    senderId: string;
    recipientId: string;
    senderName: string;
    senderUsername: string;
    recipientName: string;
    recipientUsername: string;
    latestChatMessage: ChatMessage;
};

export type TypeChat = "TEXT" | "IMAGE" | "VIDEO" | "FILE"

export type ChatMessageType = {
    id: string;
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