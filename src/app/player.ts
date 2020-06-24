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

    state: number;

    subrub: string;

    postcode: string;

    emergency_phone_number: string;

    emergency_contact_person: string;

    registration_number: number;

    is_financial: number;

    season_id : number;


    constructor(values: Object = {}) {

    Object.assign(this, values);

    }

}
