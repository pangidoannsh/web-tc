import dayjs from "dayjs";
import { DetailGroupType, GroupType, UserType } from "./interfaces";

export function jsonToUserType(jsonData: any): UserType {
    return {
        id: jsonData["id"],
        name: jsonData["name"],
        username: jsonData["username"],
        role: jsonData["role"],
        avatar: jsonData["avatar"],
        status: jsonData["status"] == 1
    }
}

export function jsonToGroupType(jsonData: any): GroupType {
    return {
        id: jsonData["id"],
        name: jsonData["name"],
        admin: jsonData["admin"],
        createdAt: jsonData["createdAt"],
        totalMember: jsonData["totalMember"],
        totalTaskDone: jsonData["totalTaskDone"],
        totalTaskInProgress: jsonData["totalTaskInProgress"],
        totalTaskTodo: jsonData["totalTaskTodo"],
        status: jsonData["status"] == 1
    }
}

export function jsonToDetailGroupType(jsonData: any): DetailGroupType {
    return {
        id: jsonData["id"],
        name: jsonData["name"],
        admin: jsonData["admin"],
        createdAt: jsonData["createdAt"],
        member: jsonData["member"],
        status: jsonData["status"] == 1
    }
}

export const chatTimeFormat = (timestamp: string): string => {
    const messageDate = dayjs(timestamp);

    if (messageDate.isSame(dayjs(), 'day')) {
        return messageDate.format("HH:mm");
    } else if (messageDate.isSame(dayjs().subtract(1, 'day'), 'day')) {
        return "Kemarin";
    } else {
        return messageDate.format("DD MMM");
    }
};

type GroupedData<T> = {
    [key: string]: T[];
};

/**
 * Groups an array of objects by a timestamp key.
 * @param key - The key in the object containing the timestamp.
 * @param data - The array of objects to group.
 * @returns An object grouped by formatted date.
 */
export function groupByTime<T>(key: keyof T, data: T[]): GroupedData<T> {
    const sortedData = data.sort((a, b) => dayjs(a[key] as string).isBefore(dayjs(b[key] as string)) ? -1 : 1);
    if (!Array.isArray(data)) {
        throw new Error("Input data must be an array");
    }

    const formatTanggal = (timestamp: string | number | Date): string => {
        return new Date(timestamp).toLocaleDateString("id-ID");
    };

    return sortedData.reduce((result: GroupedData<T>, item: T) => {
        if (!item) return {}
        const timestamp = item[key];

        if (!timestamp || !(typeof timestamp === "string" || timestamp instanceof Date || typeof timestamp === "number")) {
            throw new Error(`Key "${String(key)}" does not contain a valid timestamp`);
        }

        const formattedDate = formatTanggal(timestamp);

        if (!result[formattedDate]) {
            result[formattedDate] = [];
        }
        result[formattedDate].push(item);

        return result;
    }, {});
}

export function formatDateChatDivider(inputDate: string) {
    const [day, month, year] = inputDate.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long" };

    if (date.getTime() === today.getTime()) {
        return "Today";
    } else if (date.getTime() === yesterday.getTime()) {
        return "Kemarin";
    } else {
        return date.toLocaleDateString("id-ID", options);
    }
}

