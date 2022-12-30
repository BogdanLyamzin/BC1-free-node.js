import { NavLink } from "react-router-dom";

import styles from "./navbar-menu.module.css";

import items from "./items";

const getClassName = ({ isActive }) => {
  const className = isActive ? `${styles.link} ${styles.active}` : styles.link;
  return className;
};

const NavbarMenu = () => {
  const elements = items.map(({ id, to, text }) => (
    <li key={id}>
      <NavLink className={getClassName} to={to}>
        {text}
      </NavLink>
    </li>
  ));

  return <ul className={styles.menu}>{elements}</ul>;
};

export default NavbarMenu;
