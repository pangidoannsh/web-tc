import { ChatType, MessageType } from "./interfaces";

export const dummyChats: ChatType[] = [
    {
        id: 1,
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        lastMessage: "Hello, how are you?",
        lastMessageTime: "Today",
        isUnread: true,
        unreadCount: 2
    },
    {
        id: 2,
        name: "Jasmine",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        lastMessage: "I'm fine, thanks!",
        lastMessageTime: "17/11",
        isUnread: false
    },
    {
        id: 3,
        name: "Joseph Darma",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        lastMessage: "Today is a good day?",
        lastMessageTime: "Today",
        isUnread: true,
        unreadCount: 3
    },
    {
        id: 4,
        name: "Marina Sari",
        image: null,
        lastMessage: "Hello, how are you?",
        lastMessageTime: "Today",
        isUnread: false,
    },
    {
        id: 5,
        name: "Ariel Noah",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyGdiIEulI_nrp1XDI1QpsVwX2nrXdE7Vq0g&s",
        lastMessage: "ntar malem manggung!",
        lastMessageTime: "12:30",
        isUnread: false,
    },
    {
        id: 7,
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        lastMessage: "I'm fine, thanks!",
        lastMessageTime: "Yesterday",
        isUnread: false,
        unreadCount: 0,
    },
    {
        id: 8,
        name: "Michael Brown",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        lastMessage: "Are we meeting tomorrow?",
        lastMessageTime: "Today",
        isUnread: true,
        unreadCount: 5,
    },
    {
        id: 9,
        name: "Emily Davis",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        lastMessage: "Thanks for the update.",
        lastMessageTime: "2 days ago",
        isUnread: false,
        unreadCount: 0,
    },
    {
        id: 10,
        name: "Chris Wilson",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Can we reschedule our call?",
        lastMessageTime: "Today",
        isUnread: true,
        unreadCount: 1,
    },
    {
        id: 11,
        name: "Sophia Johnson",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        lastMessage: "I'll send you the files later.",
        lastMessageTime: "3 hours ago",
        isUnread: false,
        unreadCount: 0,
    },
    {
        id: 12,
        name: "David Martinez",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        lastMessage: "Let me check on that.",
        lastMessageTime: "Yesterday",
        isUnread: true,
        unreadCount: 3,
    },
]

export const dummyMessages: MessageType[] = [
    {
        id: 1,
        text: "Hello, how are you?",
        isSender: true,
        time: "09:27 AM"
    },
    {
        id: 2,
        text: "I'm fine, thanks!",
        isSender: false,
        time: "09:27 AM"
    },
    {
        id: 3,
        text: "Today is a good day?",
        isSender: true,
        time: "09:27 AM"
    },
]