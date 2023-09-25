import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Cart = ({ cartItems, setCartItems, totalQuantity, setTotalQuantity }) => {
  const [visibleCart, setVisibleCart] = useState(false);
  //   const [totalQuantity, setTotalQuantity] = useState(0);

  setTotalQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));

  const handleClickMinus = (item, index) => {
    const copyCartItems = [...cartItems];
    copyCartItems[index].quantity -= 1;
    copyCartItems[index].price -= item.itemPrice;
    if (copyCartItems[index].quantity === 0) {
      copyCartItems.splice(index, 1);
    }
    setCartItems(copyCartItems);

    // quantity
    setTotalQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
  };
  const handleClickPlus = (item, index) => {
    const copyCartItems = [...cartItems];
    copyCartItems[index].quantity += 1;
    copyCartItems[index].price += item.itemPrice;
    setCartItems(copyCartItems);

    // quantity
    setTotalQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
  };

  const handldeClearCart = () => {
    const copyCartItems = [...cartItems];
    copyCartItems.length = 0;
    setCartItems(copyCartItems);
    setVisibleCart(false);
  };

  const handleViewCartContent = () => {
    setVisibleCart(true);
  };

  const handleCloseCart = () => {
    setVisibleCart(false);
  };

  return cartItems.length > 0 ? (
    <>
      <aside className="visibleXs">
        {!visibleCart && (
          <>
            <span>{totalQuantity}</span>
            <button
              className="active-button active-pos1"
              onClick={handleViewCartContent}
            >
              Voir le panier
            </button>
          </>
        )}
      </aside>
      <aside className={visibleCart ? "active " : "hide-active"}>
        <button className="active-button active-pos2">
          Valider mon panier
        </button>
        <div className="inner-aside">
          <FontAwesomeIcon icon="xmark" onClick={handleCloseCart} />
          {cartItems.map((item, index) => {
            return (
              item.quantity !== 0 && (
                <div className="cart" key={index}>
                  <div className="cart-item">
                    <div>
                      <FontAwesomeIcon
                        icon="circle-minus"
                        onClick={() => {
                          handleClickMinus(item, index);
                        }}
                      />
                      <span>{item.quantity}</span>
                      <FontAwesomeIcon
                        icon="circle-plus"
                        onClick={() => {
                          handleClickPlus(item, index);
                        }}
                      />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <div>
                    <span>{Number(item.price).toFixed(2)} €</span>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="sub-total">
          <p>
            <span>Sous-total</span>
          </p>
          <span>
            {(cartItems.reduce((acc, curr) => acc + curr.price, 0) * 1).toFixed(
              2
            )}{" "}
            €
          </span>
        </div>
        <p className="delivery">
          <span>Frais de livraison</span>
          <span>{2.5} €</span>
        </p>
        <p className="total">
          <span>Total</span>
          <span>
            {(
              cartItems.reduce((acc, curr) => acc + curr.price, 0) + 2.5
            ).toFixed(2)}{" "}
            €
          </span>
        </p>
        <button className="clear-button" onClick={handldeClearCart}>
          Vider mon panier
        </button>
      </aside>
    </>
  ) : (
    <aside className="inactive">
      <button className="inactive-button">Valider mon panier</button>
      <div>
        <span>Votre panier est vide</span>
      </div>
    </aside>
  );
};

export default Cart;
