const Meal = ({ category, cartItems, setCartItems, setTotalQuantity }) => {
  // const [cartItems, setCartItems] = useState([]);
  const handleMealSelection = (meal, index) => {
    const copyCartItems = [...cartItems];

    if (copyCartItems.length === 0) {
      copyCartItems.push({
        title: meal.title,
        price: Number(meal.price),
        quantity: 1,
        itemPrice: Number(meal.price),
      });
      setCartItems(copyCartItems);
    } else {
      const index = copyCartItems.findIndex(
        (item) => item.title === meal.title
      );

      if (index !== -1) {
        copyCartItems[index].price += Number(meal.price);
        copyCartItems[index].quantity += 1;

        setCartItems(copyCartItems);
      } else {
        copyCartItems.push({
          title: meal.title,
          price: Number(meal.price),
          quantity: 1,
          itemPrice: Number(meal.price),
        });
        setCartItems(copyCartItems);
      }
    }

    // quantity
    setTotalQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
  };
  return (
    <div className="meal-container">
      {category.meals.map((meal, index) => {
        // console.log(meal.title);
        // if (index === 0)
        return (
          <div
            className="meal"
            key={meal.id}
            onClick={() => handleMealSelection(meal, index)}
          >
            <div className="sub-meal">
              <div className="sub-meal-content">
                <div>
                  <h3>{meal.title}</h3>
                  <p>{meal.description.split(" ").slice(0, 10).join(" ")}</p>
                </div>
                <p>
                  <span className="price">{meal.price} €</span>
                  {meal.popular ? (
                    <span className="popular">★ Populaire</span>
                  ) : (
                    ""
                  )}
                </p>
              </div>
              {meal.picture && (
                <div className="meal-img-bloc">
                  <img src={meal.picture} alt={meal.title} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Meal;
