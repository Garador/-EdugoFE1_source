export interface ITodoEditForm {
    title: string,
    description: string,
    finished: boolean,
    first_sighting_at: string | Date
}

export interface ITodoImportElement {
    id: number,
    name: string,
    description: string,
    first_sighting_at: string, //mm/dd/yyyy
    tagged: boolean
}