import { Post } from "./post";
import { User } from "./user";

export interface Theme {
    subscribers: string[];
    posts: Post[];
    size: number;
    rotation: number[];
    _id: string;
    themeName: string;
    userId: User;
    colour: string;
    created_at: string;
    updatedAt: string;
    __v: number
}