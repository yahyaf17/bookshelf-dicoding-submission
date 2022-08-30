const books = require('../data/books');

const deleteBookByIdaHandler = (request, h) => {
    const { id } = request.params;
    const idx = books.findIndex((b) => b.id === id);

    if (idx === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    books.splice(idx, 1);
    const resp = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    resp.code(200);
    return resp;
};

module.exports = deleteBookByIdaHandler;
