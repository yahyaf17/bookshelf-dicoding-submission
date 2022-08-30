const { nanoid } = require('nanoid');
const books = require('../data/books');

const createBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage,
        reading,
    } = request.payload;

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBooks);

    const isSuccesInsert = books.filter((b) => b.id === id).length > 0;

    if (!isSuccesInsert) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(500);
        return response;
    }

    const resp = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
            name,
            year,
            author,
            publisher,
            insertedAt,
        },
    });
    resp.code(201);
    return resp;
};

module.exports = createBookHandler;
