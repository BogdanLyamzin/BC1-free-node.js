import useForm from "../../shared/hooks/useForm"

import styles from "./login-form.module.css";

import { initialState } from "./initialState";

const LoginForm = ({onSubmit}) => {
    const {state, handleChange, handleSubmit} = useForm({initialState, onSubmit})

    const {email, password} = state;

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="">Email пользователя:</label>
                <input value={email} name="email" onChange={handleChange} className={styles.input} type="email" placeholder="Введите email пользователя" />
            </div>
            <div className={styles.group}>
                <label className={styles.label} htmlFor="">Пароль пользователя:</label>
                <input value={password} name="password" onChange={handleChange} className={styles.input} type="password" placeholder="Введите пароль пользователя" />
            </div>
            <div className={styles.group}>
                <button type="submit">Регистрация</button>
            </div>
        </form>
    )

}

export default LoginForm;