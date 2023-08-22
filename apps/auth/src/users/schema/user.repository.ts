import { GenericDocumentRepository } from '@app/shared-kernel/infrastructure/database/generic-document.repository';
import { Injectable } from '@nestjs/common';
import {  UserDocument } from './user.schema';
import { User } from '../user';

@Injectable()
export class UserRepository extends GenericDocumentRepository<User, UserDocument>