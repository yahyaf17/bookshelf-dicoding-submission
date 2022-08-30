const createBookHandler = require('./handler/createBooksHandler');
const deleteBookByIdaHandler = require('./handler/deleteBookByIdHandler');
const editBookByIdHandler = require('./handler/editBookByIdHandler');
const { getAllBookHandler } = require('./handler/getAllBooksHandler');
const getBookDetailByIdHandler = require('./handler/getBookDetailByIdHandler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: createBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookDetailByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdaHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler,
    },
];

module.exports = routes;
