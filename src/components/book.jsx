import React from 'react'
import PropTypes from 'prop-types';

const Book = ({book, onChangeShelf}) => {
    let backgroundImage = book.imageLinks && `url(${book.imageLinks.thumbnail})`;
    let style = {
        width: 128,
        height: 193,
        backgroundImage: backgroundImage
    };
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={style}></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf || "none"} onChange={(e) => onChangeShelf(book, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors && <div className="book-authors">{book.authors.join(" ")}</div>}
        </div>
    )
};

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        publisher: PropTypes.string,
        publishedDate: PropTypes.string,
        description: PropTypes.string,
        fontSize: PropTypes.number,
        industryIdentifiers: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            identifier: PropTypes.string
        })),
        readingModes: PropTypes.shape({
            text: PropTypes.bool,
            image: PropTypes.bool
        }),
        pageCount: PropTypes.number,
        printType: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.string),
        averageRating: PropTypes.number,
        ratingsCount: PropTypes.number,
        maturityRating: PropTypes.string,
        allowAnonLogging: PropTypes.bool,
        contentVersion: PropTypes.string,
        panelizationSummary: PropTypes.shape({
            containsEpubBubbles: PropTypes.bool,
            containsImageBubbles: PropTypes.bool
        }),
        imageLinks: PropTypes.shape({
            smallThumbnail: PropTypes.string,
            thumbnail: PropTypes.string
        }),
        language: PropTypes.string,
        previewLink: PropTypes.string,
        infoLink: PropTypes.string,
        canonicalVolumeLink: PropTypes.string,
        id: PropTypes.string,
        shelf: PropTypes.string
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;