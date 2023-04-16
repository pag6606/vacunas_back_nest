import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PersonEntity } from '../../entities';

/**
 * Service to Person
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private _personRepository: Repository<PersonEntity>,
  ) {}

  async createPerson(person: PersonEntity): Promise<PersonEntity> {
    return await this._personRepository.save(person);
  }
}
