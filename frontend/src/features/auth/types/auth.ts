export type UserRole =
  | 'blood_donor'
  | 'family_member'
  | 'healthcare_staff'
  | 'blood_bank_staff';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: unknown;
}