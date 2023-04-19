interface Role {
  id: number;
  name: string;
}

interface Vaccine {
  id: number;
  name: string;
  doseNumber: number;
  vaccinationDate: Date;
  employeeVaccinationId: number;
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
  vaccinationStatus: boolean;
  vaccines: Vaccine[];
  roles: Role[];
}
