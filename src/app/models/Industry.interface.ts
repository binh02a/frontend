export interface Industry {
  industryId?: string;
  industryName?: string;
  description?: string;
  roles?: Role;
}

export interface Role {
  roleId: string;
  roleName: string;
  industryId: string;
  description: string;
}
