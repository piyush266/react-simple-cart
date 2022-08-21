import { useEffect, useReducer, useState } from "react";
import Cart from "./components/Cart";
import Products from "./components/Products";
import cartReducer from "./reducers/cartReducer";
import "./App.css";

export default function App() {
  const api = "https://dummyjson.com/products?select=title,price,thumbnail";

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: []
  });

  const fetchData = async () => {
    const fetchedData = await fetch(api);
    const data = await fetchedData.json();
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.products
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(state);

  return (
    <div className="page">
      <Products state={state} dispatch={dispatch}></Products>
      <Cart state={state} dispatch={dispatch}></Cart>
    </div>
  );
}
