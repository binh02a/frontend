export interface EmployerForm {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  companyNumber: string;
  landline: string;
  mobile: string;
  website: string;
  password: string;
  password2: string;
}

export interface SignupPayload {
  email?: string;
  password?: string;
  userType: 'employer'|'employee';
  employerProfile?: {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    companyNumber?: string;
    landline?: string;
    mobile?: string;
    website?: string;
  };
}

export interface Token {
  id: string;
  email: string;
  userType: 'employee'|'employer';
  token: string;
  expiresAt: number;
}
