import {Location} from './Location.interface';
import {Role} from './Industry.interface';
export interface Job {
  accomodation: boolean;
  active: boolean;
  bonus: boolean;
  contactEmail: string;
  contactName: string;
  contactNumber: string;
  description: string;
  jobId: string;
  jobTitle: string;
  payRate: number;
  role: Role;
  roleId: string;
  startDate: string;
  workLocation: Location;
}

export interface JobDetails {
  jobDetail?: Job;
  candidates?: {
    liked?: Employee[],
    available?: Employee[],
    offered?: Employee[],
    matched?: Employee[],
  };
}

export type Employee = any;
