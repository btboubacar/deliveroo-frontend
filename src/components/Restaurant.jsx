const Restaurant = ({ data }) => {
  return (
    <>
      <div className="section-restaurant">
        <div>
          <h1>{data.restaurant.name}</h1>
          <p>{data.restaurant.description}</p>
        </div>
        <div>
          <img src={data.restaurant.picture} alt="restaurant name" />
        </div>
      </div>
    </>
  );
};

export default Restaurant;
