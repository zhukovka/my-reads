import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './components/bookshelf'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: true,
        shelves: {},
        books: [],
        query: "",
        searchResults: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => this.putBooksOnShelves(books));
    }

    putBooksOnShelves(books) {
        let shelves = books.reduce((shelves, book) => {
            if (!shelves[book.shelf]) {
                shelves[book.shelf] = [];
            }
            shelves[book.shelf].push(book);
            return shelves;
        }, {});
        return this.setState({books, shelves});
    }

    queryBooks = (event) => {
        let query = event.target.value;
        this.setState({query});
        BooksAPI.search(query).then(searchResults => {
            if (searchResults.error) {
                throw searchResults.error;
            }
            this.setState({searchResults});
        }).catch(err => {
            return console.log(err);
        });
    };

    renderHome = ({history}) => (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {this.bookShelves()}
            </div>
        </div>
        <div className="open-search">
            <a onClick={() => history.push('/search')}>Add a book</a>
        </div>
    </div>);

    bookShelves() {
        return Object.keys(this.state.shelves)
            .map(shelf => {
                let books = this.state.shelves[shelf];
                return <Bookshelf key={`shelf-${shelf}`} shelf={shelf}
                                  onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}
                                  books={books}/>;
            });
    }

    renderSearch = ({history}) => (
        <div className="search-books">
            {this.searchBar(history)}
            <div className="search-books-results">
                {<Bookshelf books={this.state.searchResults}
                            onChangeShelf={(book, shelf) => this.changeShelf(book, shelf)}/>}
            </div>
        </div>
    );

    searchBar(history) {
        return <div className="search-books-bar">
            <a className="close-search" onClick={() => history.push('/')}>Close</a>
            <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query}
                       onChange={this.queryBooks}/>

            </div>
        </div>;
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={this.renderHome}/>
                <Route path='/search' render={this.renderSearch}/>
            </div>
        )
    }

    changeShelf(book, shelf) {
        book.shelf = shelf;
        let books = [...this.state.books];
        if (!this.state.books.includes(book)) {
            books.push(book);
        }
        BooksAPI.update(book, shelf).then(shelves => this.putBooksOnShelves(books));
    }
}

export default BooksApp
