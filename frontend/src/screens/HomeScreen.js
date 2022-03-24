import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../redux/actions/productsActions";
import { Link, useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const handleItemsPerPage = (e) => {
    setItemsPerPage(e);
    setPageNumber(1);
  };

  const productList = useSelector((state) => state.productReducer);
  const { loading, error, products, currentItemsPerPage, totalPages } =
    productList;

  useEffect(() => {
    dispatch(listProduct(itemsPerPage, pageNumber));
  }, [dispatch, itemsPerPage, pageNumber]);

  const pages = Array.from(Array(totalPages).keys());

  const handleBackButton = () => {
    setPageNumber(0);
    navigate(`/?page=1&itemsPerPage=${currentItemsPerPage}`);
  };
  const handleNextButton = () => {
    setPageNumber(`${totalPages}`);
    navigate(`/?page=${totalPages}&itemsPerPage=${currentItemsPerPage}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="num-products">
            <div className="dropdown-items">
              <Link to="#">
                Items Per Page <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <ul className="dropdown-contentItems">
                <li>
                  <Link
                    to={`/?page=1&itemsPerPage=3`}
                    onClick={(e) => handleItemsPerPage(3)}
                  >
                    3 PER PAGE
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/?page=1&itemsPerPage=5`}
                    onClick={(e) => handleItemsPerPage(5)}
                  >
                    5 PER PAGE
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/?page=1&itemsPerPage=10`}
                    onClick={(e) => handleItemsPerPage(10)}
                  >
                    10 PER PAGE
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row center">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="pagination-num">
            <button onClick={handleBackButton}>
              <i className="fa fa-caret-left"></i>
            </button>
            {pages.map((pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => setPageNumber(pageIndex + 1)}
              >
                <Link
                  to={`/?page=${
                    pageIndex + 1
                  }&itemsPerPage=${currentItemsPerPage}`}
                >
                  {pageIndex + 1}
                </Link>
              </button>
            ))}
            <button onClick={handleNextButton}>
              <i className="fa fa-caret-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
