export interface EmployeeVaccination {
  id: number;
  employeeId: number;
  personId: number;
  vaccine: string;
  doseNumber: number;
  vaccinationDate: Date;
  completeName: string;
}
