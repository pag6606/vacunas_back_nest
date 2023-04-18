import { HttpException, HttpStatus } from '@nestjs/common';

interface HttpStatusMessageMap {
  [key: string]: string;
}

const statusMessages: HttpStatusMessageMap = {
  ['invalid-dni']: 'The DNI you are trying to register is not valid',
  ['email-exist']: 'The email you are trying to register already exists',
  ['dni-exist']: 'The DNI you are trying to register already exists',
};

export class EmployeeException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    const newMessage = statusMessages[message];
    super(
      {
        statusCode,
        newMessage,
        data: null,
      },
      statusCode,
    );
  }
}
