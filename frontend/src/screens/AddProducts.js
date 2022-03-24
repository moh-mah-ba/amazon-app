import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addproductAction } from "../redux/actions/productsActions";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadingImage, setLoadingImage] = useState(false);

  const uploadImage = (e) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ymjs35ml");
    setLoadingImage(true);
    axios
      .post(
        "https://api.cloudinary.com/v1_1/moh-mah-awv/image/upload",
        formData
      )
      .then((response) => {
        setImage(response.data.secure_url);
        setLoadingImage(false);
      });
  };

  const addproDetails = useSelector((state) => state.addProductReducer);
  const { error } = addproDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addproductAction(
        name,
        brand,
        description,
        category,
        price,
        countInStock,
        rating,
        numReviews,
        image
      )
    );
    navigate("/newproduct");
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Add New Product</h1>
        </div>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="brand">Brand Name</label>
          <input
            type="text"
            id="brand"
            placeholder="Brand Name"
            required
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Category"
            required
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="quentity">Quentity</label>
          <input
            type="number"
            id="quentity"
            placeholder="Quentity"
            required
            onChange={(e) => setCountInStock(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            cols={30}
            rows={5}
            required
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="img">Image</label>
          <input type="file" id="img" required onChange={uploadImage}></input>
          {image ? (
            loadingImage ? (
              <LoadingBox></LoadingBox>
            ) : (
              <img
                src={image}
                alt="uploud"
                style={{ width: "300px", padding: "1rem" }}
              />
            )
          ) : (
            <></>
          )}
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
