import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


const NewProduct = () => {
  const { id } = useParams();
  const productId = id;
  const [qty, setQty] = useState(1);
  
  const addproDetails = useSelector((state) => state.addProductReducer);
  const { newProduct , loading , error } = addproDetails;

  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <button onClick={() => navigate(-1)}>Back to result</button>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={`${newProduct.image}`}
                alt={newProduct.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{newProduct.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={newProduct.rating}
                    numReviews={newProduct.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${newProduct.price}</li>
                <li>
                  Description:
                  <p>{newProduct.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${newProduct.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {newProduct.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {newProduct.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(newProduct.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewProduct