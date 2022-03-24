import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { signout } from "../redux/actions/userAction";


const SignoutScreen = () => {
  const userSignin = useSelector((state) => state.userSigninReducer);
  const { userInfo , loading, error } = userSignin;

    const navigate = useNavigate()
    const dispatch = useDispatch()

  const submitHandler = () => {
    dispatch(signout())
    navigate("/")
  };

  const goBackHandeler =() =>{
    navigate("/")
  }
  return (
    <div>
      <form className="signout" onSubmit={submitHandler}>
        <h1>Are You Sure You Want to Sign Out</h1>
        <h3>{userInfo.name}</h3>
        <div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div className="signoutButton">
            <button type="submit">Sign Out</button>
            <button onClick={goBackHandeler} type="button">Back</button>
        </div>
      </form>
    </div>
  );
};

export default SignoutScreen;
