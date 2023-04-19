export abstract class Status {
  static Inactive = '0';
  static Active = '1';
}

export abstract class User {
  static ADMINISTRATOR = 'Administrator';
  static EMPLOYEE = 'Employee';
}

export abstract class Type {
  static UPDATE = 'UPDATE';
  static DELETE = 'DELETE';
}
