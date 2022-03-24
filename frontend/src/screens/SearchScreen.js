import React from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector } from "react-redux";

const SearchScreen = (props) => {

  const searchList = useSelector((state) => state.searchProductReducer);
  const { loading, error, products } = searchList;

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
