import React from 'react'
import Book from './book'
import {wordsFromCamelCase} from '../utils'
import PropTypes from 'prop-types';

const Bookshelf = ({books, shelf, onChangeShelf}) => {

    const renderShelf = (books) => {
        return books.map(book => {
            return (<li key={`book-${book.id}`}><Book book={book} onChangeShelf={onChangeShelf}/></li>);
        })
    };

    return (
        <div className="bookshelf">
            {shelf && <h2 className="bookshelf-title">{wordsFromCamelCase(shelf)}</h2>}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {renderShelf(books, shelf)}
                </ol>
            </div>
        </div>
    );
};
Bookshelf.propTypes = {
    shelf: PropTypes.string,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};
export default Bookshelf;