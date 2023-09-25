import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

//components
import Header from "./components/Header";
import Restaurant from "./components/Restaurant";
import Meal from "./components/Meal";

// after component import ==> order seems important
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleMinus,
  faCirclePlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./components/Cart";
library.add(faCircleMinus, faCirclePlus, faXmark);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--deliveroo-backend--25428jw7g85y.code.run/"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
      // console.log(response.data.categories[0]);
      // console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>"Page loading"</span>
  ) : (
    <>
      <div className="body-container">
        <Header />
      </div>
      <section className="container">
        <Restaurant data={data} />
      </section>
      <main>
        <div className="container">
          <div className="category-cont">
            <div>
              {data.categories.map((category, index) => {
                // if (index === 0)
                return (
                  <>
                    {category.meals.length > 0 ? (
                      <div className="category" key={category.name}>
                        <h2>{category.name}</h2>
                        <Meal
                          category={category}
                          cartItems={cartItems}
                          setCartItems={setCartItems}
                          setTotalQuantity={setTotalQuantity}
                        />
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
            {/* <aside className="cart">panier</aside> */}
            <Cart
              // totalPrice={totalPrice}
              // setTotalPrice={setTotalPrice}
              cartItems={cartItems}
              setCartItems={setCartItems}
              totalQuantity={totalQuantity}
              setTotalQuantity={setTotalQuantity}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
