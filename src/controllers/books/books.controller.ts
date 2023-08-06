import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BooksService } from 'src/services/books/books.service';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService: BooksService
    ) { }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return await this.bookService.getAllBooks()
    }

    @Get(":bookID")
    async getBookById(@Param('bookID') bookID: string): Promise<Book> {
        return await this.bookService.getBookById(bookID)
    }

    @Post()
    async saveBook(@Body() newBook: BookDTO): Promise<Book> {
        return await this.bookService.saveBook(newBook);
    }

    @Patch(":bookID")
    async updateBook(@Param('bookID') bookID: string, @Body() newBook: BookDTO): Promise<Object> {
        return await this.bookService.updateBook(bookID, newBook)
    }

    @Delete(":bookID")
    async deleteBook(@Param('bookID') bookID: string): Promise<Book> {
        return await this.bookService.deleteBook(bookID)
    }

    @Get('/name/:bookName')
    async getBookName(@Param('bookName') bookName: string): Promise<Book[]> {
        return await this.bookService.getBookByName(bookName)
    }

}
