export interface CreateEmployee {
  id: number;
  dni: number;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date;
  homeAddress: string;
  mobilePhone: string;
  status: 'Active' | 'Inactive';
  username: string | null;
  password: string | null;
  role: string | null;
}
