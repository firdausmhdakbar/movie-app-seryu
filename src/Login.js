import React from "react";
import { loginWithTMDB } from "./Auth";

const Login = () => (
  <div className="Login">
    <h1>Welcome to Cinema</h1>
    <button onClick={loginWithTMDB}>Login with TMDB</button>
  </div>
);

export default Login;
