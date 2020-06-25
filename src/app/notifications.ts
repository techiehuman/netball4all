export class Notifications {

    id: number;

    title: string;

    description: string;

    created_at : Date;

    constructor(values: Object = {}) {

        Object.assign(this, values);
    
        }
}
