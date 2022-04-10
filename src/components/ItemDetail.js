const ItemDetail = ({ item }) => {
  const { name, quantity, price, total } = item;
  const rest = price % 2;
  return (
    <div className="item-detail">
      <div className="left">
        <h4>{name}</h4>
        <p>
          {quantity} x <i className="fas fa-pound-sign"></i>
          {rest === 0 ? `${price}.00` : `${price}`}
        </p>
      </div>
      <div className="right">
        <i className="fas fa-pound-sign"> </i>
        <strong>{rest === 0 ? `${total}.00` : `${total}`}</strong>
      </div>
      <div className="flex">
        <h4>{name}</h4>
        <p>{quantity}</p>
        <p>
          <i className="fas fa-pound-sign"> </i>
          {rest === 0 ? `${price}.00` : `${price}`}
        </p>
        <p>
          <i className="fas fa-pound-sign"> </i>
          {rest === 0 ? `${total}.00` : `${total}`}
        </p>
      </div>
    </div>
  );
};

export default ItemDetail;
