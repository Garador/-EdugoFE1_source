/**
 * This is the payload for the form editing.
 */
export interface ITodoEditForm {
    title: string,
    description: string,
    finished: boolean,
    first_sighting_at: string | Date
}

/**
 * This specifies the import format for the todos.
 */
export interface ITodoImportElement {
    id: number,
    name: string,
    description: string,
    first_sighting_at: string, //mm/dd/yyyy
    tagged: boolean
}

/**
 * This specifies the action for the multiple selection component.
 */
export enum ESelAction {
    DELETED,
    CHECKED
}