export class Player {
    
    id: number;

    username: string;

    firstname: string;

    lastname: string;

    picture: string;

    emailaddress: string;

    gender: string;

    team: string;

    date_of_birth: string;

    mobile: string;

    street_address: string;

    state: string;

    subrub: string;

    postcode: string;

    emergency_phone_number: string;

    emergency_contact_person: string;


    constructor(values: Object = {}) {

    Object.assign(this, values);

    }

}
