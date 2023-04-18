interface VaccinationStatus {
  id: number;
  name: string;
}

interface DoseNumber {
  id: number;
  name: string;
  doseNumber: number;
}

export interface Employee {
  id: number;
  dni: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  homeAddress: string;
  mobilePhone: string;
  status: string;
  username: string;
  password: string;
  vaccine: boolean;
  vaccinationStatus: VaccinationStatus[];
}
