import { Role } from '../../../core/constants/role.constants';

export interface Profile {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  roles: Role;
  active: boolean;
  verified: boolean;
}