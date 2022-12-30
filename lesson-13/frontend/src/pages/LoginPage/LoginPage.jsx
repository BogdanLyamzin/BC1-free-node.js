import {useSelector, useDispatch} from "react-redux";

import LoginForm from "../../modules/LoginForm/LoginFormForm";

import { login } from "../../redux/auth/auth-operations";

import { getAuthError } from "../../redux/auth/auth-selectors";

const {REACT_APP_API_URL} = process.env;

const LoginPage = () => {
  const dispatch = useDispatch();
  const {status, message} = useSelector(getAuthError);

  const onLogin = (data) => {
      dispatch(login(data));
  }

  return (
    <div className="container">
      <h2>Login Page</h2>
      <LoginForm onSubmit={onLogin} />
      <a href={`${REACT_APP_API_URL}/auth/google`}>Login with Google</a>
      {status && <p style={{color: "red"}}>{message}</p>}
    </div>
  );
};

export default LoginPage;