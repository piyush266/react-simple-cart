const Products = ({ state, dispatch }) => {
  const { products, cart } = state;

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="singleProduct">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="productImage"
          />
          <div className="productTitle">
            <span> {product.title} </span>
            <b>$ {product.price} </b>
          </div>

          {cart.some((el) => el.id === product.id) ? (
            <button
              key={product.id}
              className="removeButton"
              onClick={(e) =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: {
                    id: product.id,
                    qty: 1
                  }
                })
              }
            >
              {" "}
              Remove from cart
            </button>
          ) : (
            <button
              key={product.id}
              className="addButton"
              onClick={(e) =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    qty: 1
                  }
                })
              }
            >
              {" "}
              Add to cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
