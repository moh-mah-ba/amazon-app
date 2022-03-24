import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import CartScreens from "./screens/CartScreens";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import SignoutScreen from "./screens/SignoutScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import Search from "./components/Search";
import SearchScreen from "./screens/SearchScreen";
import AddProducts from "./screens/AddProducts";
import NewProduct from "./screens/NewProduct";

function App() {
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart;

  const usersignin = useSelector((state) => state.userSigninReducer);
  const {userInfo , userRole} = usersignin;

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            amazon
          </Link>
        </div>
        <div>
          <Search />
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
           {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/users/signout">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/users/signin">Sign In</Link>
            )}
            {userRole === "ADMIN" ? (
              <Link to="/addproduct">Add New Product</Link> 
              ) : (<h1 style={{display: "none"}}>no admin</h1>
              )  }
            
        </div>
      </header>
      <main>
        <Routes>
          <Route path="newproduct" element={<NewProduct />} />
          <Route path="addproduct" element={<AddProducts />} />
          <Route path="search/:search" element={<SearchScreen />} />
          <Route path="shipping" element={<ShippingAddressScreen />} />
          <Route path="users/register" element={<RegisterScreen />} />
          <Route path="users/signout" element={<SignoutScreen />} />
          <Route path="users/signin" element={<SigninScreen />} />
          <Route path="cart/:id" element={<CartScreens />} />
          <Route path="cart/" element={<CartScreens />} />
          <Route path="product/:id" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} exact />
        </Routes>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
