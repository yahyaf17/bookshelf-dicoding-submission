const books = require('../data/books');

const getBookDetailByIdHandler = (request, h) => {
    const { id } = request.params;
    const selectedBook = books.filter((b) => b.id === id)[0];

    if (selectedBook === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    const resp = h.response({
        status: 'success',
        data: {
            book: selectedBook,
        },
    });
    resp.code(200);
    return resp;
};

module.exports = getBookDetailByIdHandler;
