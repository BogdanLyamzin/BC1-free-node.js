import styles from "./book-list.module.css";

const BookList = ({ books, removeBook }) => {
    const elements = books.map(({ id, title, author }) => (
        <li key={id}
            className={styles.item}>{title}. Автор: {author}.
            <button type="button" className={styles.btn}
                onClick={() => removeBook(id)}>Удалить</button>
        </li>
    ));

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default BookList;