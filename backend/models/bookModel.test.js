import { expect } from "chai";
import mongoose from "mongoose";
import { Book } from "./bookModel.js";
import supertest from "supertest";
import { mongodbURL } from "../config.js";

const api = supertest("http://localhost:5555");

describe("Book Model Tests", () => {
  before(async () => {
    await mongoose.connect(mongodbURL);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  it("should save a new book to the database", async () => {
    const data = {
      title: "Book #1",
      author: "John Doe",
      publishYear: 2022,
    };

    const savedBook = await Book.create(data);

    expect(savedBook._id).to.exist;
    expect(savedBook.title).to.equal(data.title);
    expect(savedBook.author).to.equal(data.author);
    expect(savedBook.publishYear).to.equal(data.publishYear);
  });

  it("should not save a book without required fields", async () => {
    const invalidBook = new Book({});

    try {
      await invalidBook.validate();
      throw new Error(
        "Validation should fail for book without required fields"
      );
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors.title).to.exist;
      expect(error.errors.author).to.exist;
      expect(error.errors.publishYear).to.exist;
    }
  });
});
