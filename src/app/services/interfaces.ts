export interface ICompare {
    _id?: string;
    group: string;
    left: string;
    right: string;
}

export enum FormActions {
    update = 'Update',
    delete = 'Delete',
    create = 'New',
    run = 'Run'
}

export interface IFormData{
    action: FormActions;
    data: any;
}
