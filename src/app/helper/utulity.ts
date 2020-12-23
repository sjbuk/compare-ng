import { ICompare } from '../services/interfaces';
import {v4 as uuid } from 'uuid';
import * as Papa from 'papaparse';



export function csvToJson(text: string): ICompare[] {
    const csvConfig = {
        header: true,
        skipEmptyLines: true
    };
    console.log (text);
    let data: Array<any> = Papa.parse(text, csvConfig).data;
    // Map columns from csv to what mongo requires
    data = data.map((el: any) => {
        const id: string = uuid();
        return (
            {
                _id : id,
                group: Object.values(el)[0] as string,
                left: Object.values(el)[1] as string,
                right: Object.values(el)[2] as string
            });
    });
    return data;
}

export async function getFileContents(file: File): Promise<any> {
    return new Promise<File>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event: any) => {
            const data = event.target.result;
            resolve(data);
        };
        reader.readAsText(file);
    });
}





