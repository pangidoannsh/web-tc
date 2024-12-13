import { GroupType, UserType } from "./interfaces";
import moment from "moment";
import "moment/locale/id";

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

export const chatTimeFormat = (timestamp: string): string => {
    const messageDate = moment(timestamp);

    if (messageDate.isSame(moment(), 'day')) {
        return messageDate.format("HH:mm");
    } else if (messageDate.isSame(moment().subtract(1, 'day'), 'day')) {
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
    const sortedData = data.sort((a, b) => moment(a[key] as string).isBefore(moment(b[key] as string)) ? -1 : 1);
    if (!Array.isArray(data)) {
        throw new Error("Input data must be an array");
    }

    const formatTanggal = (timestamp: string | number | Date): string => {
        const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long" };
        return new Date(timestamp).toLocaleDateString("id-ID", options);
    };

    return sortedData.reduce((result: GroupedData<T>, item: T) => {
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
