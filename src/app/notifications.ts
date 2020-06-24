export class Notifications {

    id: number;

    title: string;

    description: string;

    constructor(values: Object = {}) {

        Object.assign(this, values);
    
        }
}
