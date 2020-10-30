// package: gigamessages
// file: proto/messages.proto

import * as jspb from "google-protobuf";

export class InitData extends jspb.Message {
  getDatapath(): string;
  setDatapath(value: string): void;

  getApipath(): string;
  setApipath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitData.AsObject;
  static toObject(includeInstance: boolean, msg: InitData): InitData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InitData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitData;
  static deserializeBinaryFromReader(message: InitData, reader: jspb.BinaryReader): InitData;
}

export namespace InitData {
  export type AsObject = {
    datapath: string,
    apipath: string,
  }
}

export class Login extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Login.AsObject;
  static toObject(includeInstance: boolean, msg: Login): Login.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Login, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Login;
  static deserializeBinaryFromReader(message: Login, reader: jspb.BinaryReader): Login;
}

export namespace Login {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getToken(): string;
  setToken(value: string): void;

  getUserid(): number;
  setUserid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    token: string,
    userid: number,
  }
}

export class CreateNote extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getText(): string;
  setText(value: string): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNote.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNote): CreateNote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNote;
  static deserializeBinaryFromReader(message: CreateNote, reader: jspb.BinaryReader): CreateNote;
}

export namespace CreateNote {
  export type AsObject = {
    title: string,
    text: string,
    folderid: string,
  }
}

export class CreateFolder extends jspb.Message {
  getParentid(): string;
  setParentid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFolder.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFolder): CreateFolder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateFolder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFolder;
  static deserializeBinaryFromReader(message: CreateFolder, reader: jspb.BinaryReader): CreateFolder;
}

export namespace CreateFolder {
  export type AsObject = {
    parentid: string,
    title: string,
  }
}

export class CreateFolderResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateFolderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateFolderResponse): CreateFolderResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateFolderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateFolderResponse;
  static deserializeBinaryFromReader(message: CreateFolderResponse, reader: jspb.BinaryReader): CreateFolderResponse;
}

export namespace CreateFolderResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    folderid: string,
  }
}

export class CreateNoteResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getNoteid(): string;
  setNoteid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateNoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateNoteResponse): CreateNoteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateNoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateNoteResponse;
  static deserializeBinaryFromReader(message: CreateNoteResponse, reader: jspb.BinaryReader): CreateNoteResponse;
}

export namespace CreateNoteResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    noteid: string,
  }
}

export class GetNotesList extends jspb.Message {
  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotesList.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotesList): GetNotesList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotesList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotesList;
  static deserializeBinaryFromReader(message: GetNotesList, reader: jspb.BinaryReader): GetNotesList;
}

export namespace GetNotesList {
  export type AsObject = {
    folderid: string,
  }
}

export class GetAllNotes extends jspb.Message {
  getOffset(): number;
  setOffset(value: number): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllNotes.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllNotes): GetAllNotes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAllNotes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllNotes;
  static deserializeBinaryFromReader(message: GetAllNotes, reader: jspb.BinaryReader): GetAllNotes;
}

export namespace GetAllNotes {
  export type AsObject = {
    offset: number,
    limit: number,
  }
}

export class SetToken extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetToken.AsObject;
  static toObject(includeInstance: boolean, msg: SetToken): SetToken.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetToken, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetToken;
  static deserializeBinaryFromReader(message: SetToken, reader: jspb.BinaryReader): SetToken;
}

export namespace SetToken {
  export type AsObject = {
    token: string,
  }
}

export class NoteShortInfo extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  getUpdatedat(): number;
  setUpdatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NoteShortInfo.AsObject;
  static toObject(includeInstance: boolean, msg: NoteShortInfo): NoteShortInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NoteShortInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NoteShortInfo;
  static deserializeBinaryFromReader(message: NoteShortInfo, reader: jspb.BinaryReader): NoteShortInfo;
}

export namespace NoteShortInfo {
  export type AsObject = {
    id: string,
    folderid: string,
    title: string,
    createdat: number,
    updatedat: number,
  }
}

export class GetNotesListResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  clearNotesList(): void;
  getNotesList(): Array<NoteShortInfo>;
  setNotesList(value: Array<NoteShortInfo>): void;
  addNotes(value?: NoteShortInfo, index?: number): NoteShortInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNotesListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNotesListResponse): GetNotesListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNotesListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNotesListResponse;
  static deserializeBinaryFromReader(message: GetNotesListResponse, reader: jspb.BinaryReader): GetNotesListResponse;
}

export namespace GetNotesListResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    notesList: Array<NoteShortInfo.AsObject>,
  }
}

export class Folder extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParentid(): string;
  setParentid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getLevel(): number;
  setLevel(value: number): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  getUpdatedat(): number;
  setUpdatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Folder.AsObject;
  static toObject(includeInstance: boolean, msg: Folder): Folder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Folder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Folder;
  static deserializeBinaryFromReader(message: Folder, reader: jspb.BinaryReader): Folder;
}

export namespace Folder {
  export type AsObject = {
    id: string,
    parentid: string,
    title: string,
    level: number,
    createdat: number,
    updatedat: number,
  }
}

export class GetFoldersListResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  clearFoldersList(): void;
  getFoldersList(): Array<Folder>;
  setFoldersList(value: Array<Folder>): void;
  addFolders(value?: Folder, index?: number): Folder;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFoldersListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFoldersListResponse): GetFoldersListResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFoldersListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFoldersListResponse;
  static deserializeBinaryFromReader(message: GetFoldersListResponse, reader: jspb.BinaryReader): GetFoldersListResponse;
}

export namespace GetFoldersListResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    foldersList: Array<Folder.AsObject>,
  }
}

export class GetNoteById extends jspb.Message {
  getNoteid(): string;
  setNoteid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNoteById.AsObject;
  static toObject(includeInstance: boolean, msg: GetNoteById): GetNoteById.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNoteById, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNoteById;
  static deserializeBinaryFromReader(message: GetNoteById, reader: jspb.BinaryReader): GetNoteById;
}

export namespace GetNoteById {
  export type AsObject = {
    noteid: string,
  }
}

export class GetNoteByIdResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getId(): string;
  setId(value: string): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNoteByIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNoteByIdResponse): GetNoteByIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNoteByIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNoteByIdResponse;
  static deserializeBinaryFromReader(message: GetNoteByIdResponse, reader: jspb.BinaryReader): GetNoteByIdResponse;
}

export namespace GetNoteByIdResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    id: string,
    folderid: string,
    title: string,
    text: string,
  }
}

export class GetFolderById extends jspb.Message {
  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFolderById.AsObject;
  static toObject(includeInstance: boolean, msg: GetFolderById): GetFolderById.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFolderById, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFolderById;
  static deserializeBinaryFromReader(message: GetFolderById, reader: jspb.BinaryReader): GetFolderById;
}

export namespace GetFolderById {
  export type AsObject = {
    folderid: string,
  }
}

export class GetFolderByIdResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getParentid(): string;
  setParentid(value: string): void;

  getLevel(): number;
  setLevel(value: number): void;

  getCreatedat(): number;
  setCreatedat(value: number): void;

  getUpdatedat(): number;
  setUpdatedat(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetFolderByIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetFolderByIdResponse): GetFolderByIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetFolderByIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetFolderByIdResponse;
  static deserializeBinaryFromReader(message: GetFolderByIdResponse, reader: jspb.BinaryReader): GetFolderByIdResponse;
}

export namespace GetFolderByIdResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    id: string,
    title: string,
    parentid: string,
    level: number,
    createdat: number,
    updatedat: number,
  }
}

export class RemoveNote extends jspb.Message {
  getNoteid(): string;
  setNoteid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveNote.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveNote): RemoveNote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveNote;
  static deserializeBinaryFromReader(message: RemoveNote, reader: jspb.BinaryReader): RemoveNote;
}

export namespace RemoveNote {
  export type AsObject = {
    noteid: string,
  }
}

export class RemoveFolder extends jspb.Message {
  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveFolder.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveFolder): RemoveFolder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveFolder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveFolder;
  static deserializeBinaryFromReader(message: RemoveFolder, reader: jspb.BinaryReader): RemoveFolder;
}

export namespace RemoveFolder {
  export type AsObject = {
    folderid: string,
  }
}

export class GetRootFolderResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRootFolderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetRootFolderResponse): GetRootFolderResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetRootFolderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRootFolderResponse;
  static deserializeBinaryFromReader(message: GetRootFolderResponse, reader: jspb.BinaryReader): GetRootFolderResponse;
}

export namespace GetRootFolderResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    folderid: string,
    title: string,
  }
}

export class EmptyResultResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyResultResponse.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyResultResponse): EmptyResultResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyResultResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyResultResponse;
  static deserializeBinaryFromReader(message: EmptyResultResponse, reader: jspb.BinaryReader): EmptyResultResponse;
}

export namespace EmptyResultResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
  }
}

export class GetLastLoginDataResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrorcode(): number;
  setErrorcode(value: number): void;

  getToken(): string;
  setToken(value: string): void;

  getUserid(): number;
  setUserid(value: number): void;

  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLastLoginDataResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLastLoginDataResponse): GetLastLoginDataResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLastLoginDataResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLastLoginDataResponse;
  static deserializeBinaryFromReader(message: GetLastLoginDataResponse, reader: jspb.BinaryReader): GetLastLoginDataResponse;
}

export namespace GetLastLoginDataResponse {
  export type AsObject = {
    success: boolean,
    errorcode: number,
    token: string,
    userid: number,
    email: string,
  }
}

export class SearchNotes extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchNotes.AsObject;
  static toObject(includeInstance: boolean, msg: SearchNotes): SearchNotes.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchNotes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchNotes;
  static deserializeBinaryFromReader(message: SearchNotes, reader: jspb.BinaryReader): SearchNotes;
}

export namespace SearchNotes {
  export type AsObject = {
    query: string,
    folderid: string,
  }
}

export class UpdateFolder extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getParentid(): string;
  setParentid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getLevel(): number;
  setLevel(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateFolder.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateFolder): UpdateFolder.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateFolder, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateFolder;
  static deserializeBinaryFromReader(message: UpdateFolder, reader: jspb.BinaryReader): UpdateFolder;
}

export namespace UpdateFolder {
  export type AsObject = {
    id: string,
    parentid: string,
    title: string,
    level: number,
  }
}

export class UpdateNote extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFolderid(): string;
  setFolderid(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateNote.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateNote): UpdateNote.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateNote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateNote;
  static deserializeBinaryFromReader(message: UpdateNote, reader: jspb.BinaryReader): UpdateNote;
}

export namespace UpdateNote {
  export type AsObject = {
    id: string,
    folderid: string,
    title: string,
    text: string,
  }
}

