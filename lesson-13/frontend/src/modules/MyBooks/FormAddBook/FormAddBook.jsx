import useForm from "../../../shared/hooks/useForm"

import styles from "./form-add-book.module.css";

import { initialState } from "./initialState";

const FormAddBook = ({onSubmit}) => {
    const {state, handleChange, handleSubmit} = useForm({initialState, onSubmit})

    const {title, author, favorite} = state;

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="">Название:</label>
                <input value={title} name="title" onChange={handleChange} className={styles.input} type="text" placeholder="Название книги" />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="">Автор:</label>
                <input value={author} name="author" onChange={handleChange} className={styles.input} type="text" placeholder="Автор книги" />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="">Любимая:</label>
                <input name="favorite" checked={favorite} onChange={handleChange} type="checkbox" />
            </div>
            <div className={styles.group}>
                <button type="submit">Добавить</button>
            </div>
        </form>
    )

}

export default FormAddBook;