import {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";

import Container from "./Container";
import FormAddBook from "./FormAddBook";
import BookList from "./BookList";

import { fetchBooks, addBook, removeBook } from "../../redux/books/books-operations";
import {setFilter} from "../../redux/filter/filter-actions";
import { getFilteredBooks } from "../../redux/books/books-selectors";
import { getFilter } from "../../redux/filter/filter-selectors";

import styles from "./my-books.module.css";

const MyBooks = () => {
    const books = useSelector(getFilteredBooks);
    const filter = useSelector(getFilter);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchBooks())
    }, [dispatch]);

    const onAddBook = (payload) => {
        dispatch(addBook(payload))
    }

    const onRemoveBook = (id) => {
        dispatch(removeBook(id));
    }

    const onSetFilter = ({target}) => {
        dispatch(setFilter(target.value))
    }

    return (
        <div className={styles.books}>
            <Container title="Добавить книгу">
                <FormAddBook onSubmit={onAddBook} />
            </Container>
            <Container title="Список книг">
                <input onChange={onSetFilter} value={filter} name="filter" type="text" placeholder="Введите название " />
                <BookList books={books} removeBook={onRemoveBook}  />
            </Container>
        </div>
    )

}

export default MyBooks;