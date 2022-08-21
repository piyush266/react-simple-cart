import { useEffect, useState } from "react";

const Cart = ({ state, dispatch }) => {
  const { cart } = state;
  const [total, setTotal] = useState(0);
  const changeQty = (id, qty) => {
    dispatch({
      type: "CHANGE_QTY",
      payload: {
        id,
        qty
      }
    });
  };

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="cart">
      <b className="cartTitle">Cart</b>
      <b style={{ alignSelf: "center" }}> SubTotal: ${total}</b>
      {cart.length > 0 ? (
        cart.map((product) => (
          <div className="cartProduct">
            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="cartProductImage"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <span> {product.title} </span>
                <b> ${product.price} </b>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <button onClick={() => changeQty(product.id, product.qty - 1)}>
                -
              </button>
              <span>{product.qty}</span>
              <button onClick={() => changeQty(product.id, product.qty + 1)}>
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <span
          style={{
            alignSelf: "center",
            padding: "20px"
          }}
        >
          Cart is Empty
        </span>
      )}
    </div>
  );
};

export default Cart;
