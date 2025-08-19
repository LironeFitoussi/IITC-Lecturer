export interface todo {
    "userId": number,
    "id": number,
    "title": string,
    "completed"?: boolean
}


export type todoDTO = Omit<todo, 'id'>;