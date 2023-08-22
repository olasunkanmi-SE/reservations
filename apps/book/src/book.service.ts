import { Inject, Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { TYPES } from "./constants/contstants";
import { IBookRepoitory } from "./dto/book-repository.interface";
import { Book } from "./book";

@Injectable()
export class BookService {
  constructor(@Inject(TYPES.IBookRepoitory) private readonly bookRepository: IBookRepoitory) {}
  create(createBookDto: CreateBookDto) {}

  findAll() {
    return `This action returns all book`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
