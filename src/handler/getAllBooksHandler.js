const books = require('../data/books');

function filterByQueryParams(name, reading, finished, filteredBooks) {
    if (name !== undefined) {
        const nameFilter = books.filter((b) => b.name.toLowerCase()
            .includes(name.toLowerCase()));
        filteredBooks.push(...nameFilter);
    }

    if (reading !== undefined) {
        const readFilter = books.filter((b) => b.reading === Boolean(Number(reading)));
        filteredBooks.push(...readFilter);
    }

    if (finished !== undefined) {
        const finishFilter = books.filter((b) => b.finished === Boolean(Number(finished)));
        filteredBooks.push(...finishFilter);
    }
}

const getAllBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    const filteredBooks = [];

    if (name === undefined && reading === undefined && finished === undefined) {
        console.log('no filter');
        filteredBooks.push(...books);
    } else {
        filterByQueryParams(name, reading, finished, filteredBooks);
    }

    const booksResp = [];
    filteredBooks.forEach((book) => {
        booksResp.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
            // reading: book.reading,
        });
    });

    const resp = h.response({
        status: 'success',
        data: {
            books: booksResp,
        },
    });
    resp.code(200);
    return resp;
};

module.exports = { getAllBookHandler };
