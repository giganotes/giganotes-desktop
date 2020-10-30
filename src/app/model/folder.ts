import { Note } from '../model/note';

export interface Folder {
    id: string;
    title: string;
    parentId: string;
    children: Folder[];
    notes: Note[];
    level: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
