import { HttpException, HttpStatus } from '@nestjs/common';

export class NoUniqueNameException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.CONFLICT);
    this.messages = response
    console.log(response)

  }
}
