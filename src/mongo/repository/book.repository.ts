import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BookDTO } from "src/DTO/books.dto";
import { Book } from "../interfaces/book.interface";
import { Model } from "mongoose";


@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('book') private readonly bookModel: Model<Book>
    ) { }

    async saveBook(newBook: BookDTO): Promise<Book> {
        const createdBook = new this.bookModel(newBook);
        return createdBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find({}, { __v: false }).sort({ name: +1 }).exec()
    }

    async getBookById(bookID: string): Promise<Book> {
        return await this.bookModel.findById(bookID, { __v: false })
    }

    async deleteBook(bookID: string): Promise<Book> {
        return await this.bookModel.findOneAndDelete({ _id: bookID }, { __v: false })
    }

    async updateBook(bookID: string, book: BookDTO): Promise<Object> {
        return await this.bookModel.replaceOne({ _id: bookID }, book);
    }

    async getBookByName(bookName: string): Promise<Book[]> {
        return await this.bookModel.find({
            name: { '$regex': bookName, '$options': 'i' }
        }, { __v: false })
    }

}