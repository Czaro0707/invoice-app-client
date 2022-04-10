const Item = ({
  item,
  index,
  deleteItem,
  changeFormData,
  formData,
  checkedFormData,
}) => {
  const { name, price, quantity, total } = item;
  console.log(checkedFormData.items);
  console.log(index);

  return (
    <div className="form__fourfold">
      <div
        className={`input-container ${
          !formData.items[index].name && checkedFormData.items[index].name
            ? "input-container--wrong"
            : ""
        } `}
      >
        <label htmlFor="itemName" className="form__input">
          Item Name
        </label>
        <input
          onChange={(e) => changeFormData(e, index)}
          type="text"
          id="itemName"
          name="itemName"
          value={name}
          required={true}
        />
      </div>

      <div
        className={`input-container ${
          !formData.items[index].quantity &&
          checkedFormData.items[index].quantity
            ? "input-container--wrong"
            : ""
        } `}
      >
        <label htmlFor="quantity" className="form__input">
          Qty.
        </label>
        <input
          onChange={(e) => changeFormData(e, index)}
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          required={true}
          placeholder="0"
        />
      </div>

      <div
        className={`input-container ${
          !formData.items[index].price && checkedFormData.items[index].price
            ? "input-container--wrong"
            : ""
        } `}
      >
        <label htmlFor="price" className="form__input">
          Price
        </label>
        <input
          onChange={(e) => changeFormData(e, index)}
          type="number"
          id="price"
          name="price"
          value={price}
          placeholder="0.00"
          required={true}
        />
      </div>

      <div className="input-container">
        <label htmlFor="total" className="form__input">
          Total
        </label>
        <span>{total}</span>
      </div>

      <i
        className="fas fa-trash form__trash"
        onClick={(e) => deleteItem(e, index)}
      ></i>
    </div>
  );
};

export default Item;
