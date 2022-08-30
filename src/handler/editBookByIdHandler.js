const books = require('../data/books');

const editBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const {
        name, year, author, summary, publisher,
        pageCount, readPage, reading,
    } = request.payload;

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage >= pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const idx = books.findIndex((b) => b.id === id);
    if (idx === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    const finished = pageCount === readPage;

    books[idx] = {
        ...books[idx],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
    };

    const resp = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    });
    resp.code(200);
    return resp;
};

module.exports = editBookByIdHandler;
