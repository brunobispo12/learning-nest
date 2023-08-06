import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BookRepository } from 'src/mongo/repository/book.repository';

@Injectable()
export class BooksService {


    constructor(
        private readonly bookRepository: BookRepository
    ) { }

    async saveBook(newBook: BookDTO): Promise<Book> {
        return await this.bookRepository.saveBook(newBook);
    }

    async getAllBooks(): Promise<Book[]> {

        const allBooks = await this.bookRepository.getAllBooks()

        if (!allBooks.length) {
            throw new BadRequestException('There are no books registered yet')
        } else {
            return allBooks
        }

    }

    async getBookById(bookID: string): Promise<Book> {
        try {
            const existBook = await this.bookRepository.getBookById(bookID)

            if (!existBook) {
                throw new BadRequestException("There are no results")
            }

            return existBook

        } catch (e) {
            throw new BadRequestException("There are no results")
        }
    }

    async deleteBook(bookID: string): Promise<Book> {
        try {
            return await this.bookRepository.deleteBook(bookID)
        } catch (e) {
            throw new BadRequestException("This book does not exist")
        }
    }

    async updateBook(bookID: string, newBook: BookDTO): Promise<Object> {

        const existBook = await this.bookRepository.getBookById(bookID)

        if (!existBook) throw new BadRequestException("There are no results")

        const updatedBook = await this.bookRepository.updateBook(bookID, newBook)

        if (updatedBook) {
            return this.bookRepository.getBookById(bookID)
        } else {
            throw new BadRequestException(" Error in updating book!")
        }
    }

    async getBookByName(bookName: string): Promise<Book[]> {

        const foundBooks = await this.bookRepository.getBookByName(bookName)

        if (!foundBooks) throw new BadRequestException("There are no results")

        return foundBooks

    }
}
