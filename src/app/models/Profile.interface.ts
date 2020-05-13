export interface Profile{
    id: string;
    email: string;
    userType: string;
    employerProfile: EmployerProfile;
}

export interface EmployerProfile {
    employerId?: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    companyNumber?: string;
    landline?: string;
    mobile?: string;
    website?: string;
}
