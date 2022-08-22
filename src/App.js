import { useEffect, useReducer, useState } from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import cartReducer from "./reducers/cartReducer";
import "./App.css";

export default function App() {
  const api = "https://dummyjson.com/products";
  const [keyWord, setKeyWord] = useState(null);


  //Debounce logic
  let timeOutId
  const searchProduct = (keyword) => {
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      setKeyWord(keyword.toLowerCase())
    }, 1000)
  }

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: []
  });

  const fetchData = async () => {
    const fetchedData = await fetch(keyWord ? `${api}/search?q=${keyWord}` : `${api}`);
    const data = await fetchedData.json();
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.products
    });
  };

  useEffect(() => {
    fetchData();
  }, [keyWord, fetchData]);

  return (
    <>
      <div style={{marginLeft: "14px", marginRight: "60px"}}>
        <input style={{width: "80%", padding: "10px"}} type="search" placeholder="Search Product" onChange={(e) => searchProduct(e.target.value)}></input>
      </div>
      <div className="page">
        <Products state={state} dispatch={dispatch}></Products>
        <Cart state={state} dispatch={dispatch}></Cart>
      </div>
    </>
  );
}
