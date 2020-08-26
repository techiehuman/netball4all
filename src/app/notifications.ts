export class Notifications {

    id: number;

    title: string;

    description: string;

    created_at : string;

    constructor(values: Object = {}) {

        Object.assign(this, values);
    
        }
}
