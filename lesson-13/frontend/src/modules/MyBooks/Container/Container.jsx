import PropTypes from "prop-types";

import styles from "./container.module.css";

const Container = ({title, children}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    )
}

export default Container;

Container.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}