export interface Note {
    id: string;
    title: string;
    text: string;
    folderId: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    deletedAt: Date;
}
