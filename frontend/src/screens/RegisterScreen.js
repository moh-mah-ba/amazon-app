import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Link , useNavigate } from "react-router-dom";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userRegister = useSelector((state) => state.userRegisterReducer);
  const {userInfo , loading, error } = userRegister;
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      Dispatch(register(name, email, password) , userInfo);
      navigate("/users/signin")
    }
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={"/users/signin"}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
