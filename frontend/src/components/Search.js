import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchAction } from "../redux/actions/productsActions";

const Search = (props) => {
  const [search , setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(search){
      navigate(`/search/${search}`);
      dispatch(searchAction(search));
    }else{
      navigate(`/search/search`)
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
