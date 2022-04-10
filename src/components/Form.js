import Item from "./Item";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const Form = ({ setIsFormVisible, detailInvoice, setDetailInvoice }) => {
  let navigate = useNavigate();

  let _id;
  let createdAt = "";
  let paymentDue = "";
  let description = "";
  let paymentTerms = 1;
  let clientName = "";
  let clientEmail = "";
  let status = "draft";
  let street = "";
  let city = "";
  let postCode = "";
  let country = "";
  let streetTo = "";
  let cityTo = "";
  let postCodeTo = "";
  let countryTo = "";
  let items = [];
  let total = 0;

  const [formData, setFormData] = useState({
    createdAt: createdAt,
    paymentDue: paymentDue,
    description: description,
    paymentTerms: paymentTerms,
    clientName: clientName,
    clientEmail: clientEmail,
    status: status,
    senderAddress: {
      street: street,
      city: city,
      postCode: postCode,
      country: country,
    },
    clientAddress: {
      street: streetTo,
      city: cityTo,
      postCode: postCodeTo,
      country: countryTo,
    },
    items: items,
    total: total,
  });

  const [checkedFormData, setCheckedFormData] = useState({
    createdAt: false,
    paymentDue: false,
    description: false,
    paymentTerms: false,
    clientName: false,
    clientEmail: false,
    status: false,
    senderAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    clientAddress: {
      street: false,
      city: false,
      postCode: false,
      country: false,
    },
    items: [],
    total: false,
  });

  const [errors, setErrors] = useState({
    fieldsError: "- All fields must be added",
    itemError: "- An item must be added",
  });

  if (detailInvoice) {
    _id = detailInvoice._id;
    createdAt = detailInvoice.createdAt;
    paymentDue = detailInvoice.paymentDue;
    description = detailInvoice.description;
    paymentTerms = detailInvoice.description;
    clientName = detailInvoice.clientName;
    clientEmail = detailInvoice.clientEmail;
    status = detailInvoice.status;
    street = detailInvoice.senderAddress.street;
    city = detailInvoice.senderAddress.city;
    postCode = detailInvoice.senderAddress.postCode;
    country = detailInvoice.senderAddress.country;
    streetTo = detailInvoice.clientAddress.street;
    cityTo = detailInvoice.clientAddress.city;
    postCodeTo = detailInvoice.clientAddress.postCode;
    countryTo = detailInvoice.clientAddress.country;
    items = detailInvoice.items;
    total = detailInvoice.total;
  }

  const createTodaysDate = (date) => {
    var today = date;
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const changeFormData = (e, index, billInformation) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "itemName" || name === "quantity" || name === "price") {
      let { items } = formData;
      let { total } = formData;

      let checkedItems = checkedFormData.items;
      total = 0;
      if (name === "itemName") {
        items[index].name = value;
        checkedItems[index].name = true;
      } else if (name === "quantity") {
        items[index].quantity = value;
        items[index].total = items[index].quantity * items[index].price;
        checkedItems[index].quantity = true;
      } else if (name === "price") {
        items[index].price = value;
        items[index].total = items[index].quantity * items[index].price;
        checkedItems[index].price = true;
      }
      for (let i = 0; i < items.length; i++) {
        total += items[i].total;
      }
      setFormData((prevState) => ({
        ...prevState,
        items: items,
        total: total,
      }));

      setCheckedFormData((prevState) => ({
        ...prevState,
        items: checkedItems,
      }));
    } else if (name === "senderAddress") {
      let { senderAddress } = formData;
      senderAddress[billInformation] = value;

      setFormData((prevState) => ({
        ...prevState,
        senderAddress: senderAddress,
      }));
      let checked = checkedFormData.senderAddress;

      checked[billInformation] = true;

      setCheckedFormData((prevState) => ({
        ...prevState,
        senderAddress: checked,
      }));
    } else if (name === "clientAddress") {
      let { clientAddress } = formData;
      clientAddress[billInformation] = value;

      setFormData((prevState) => ({
        ...prevState,
        clientAddress: clientAddress,
      }));

      let checked = checkedFormData.clientAddress;

      checked[billInformation] = true;

      setCheckedFormData((prevState) => ({
        ...prevState,
        senderAddress: checked,
      }));
    } else if (name === "paymentTerms") {
      const someDate = new Date(formData.createdAt);
      const numberOfDaysToAdd = parseInt(value);
      const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

      let myDate = new Date(result);

      let { paymentDue } = formData;

      paymentDue = createTodaysDate(myDate);

      setFormData((prevState) => ({
        ...prevState,
        paymentDue: paymentDue,
        paymentTerms: parseInt(value),
      }));
    } else if (name === "createdAt") {
      let { paymentTerms } = formData;
      let { paymentDue } = formData;

      const someDate = new Date(value);
      const numberOfDaysToAdd = parseInt(paymentTerms);
      const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

      let myDate = new Date(result);
      paymentDue = createTodaysDate(myDate);

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        paymentDue: paymentDue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      setCheckedFormData((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  };

  const addItem = (e) => {
    let { items } = formData;
    let checkedItems = checkedFormData.items;

    items.push({
      name: "",
      quantity: "",
      price: "",
      total: "",
    });

    checkedItems.push({
      name: false,
      quantity: false,
      price: false,
    });
    setFormData((prevState) => ({
      ...prevState,
      items: items,
    }));
    setCheckedFormData((prevState) => ({
      ...prevState,
      items: checkedItems,
    }));
  };

  const deleteItem = (e, index) => {
    let { items } = formData;

    items.splice(index, 1);

    setFormData((prevState) => ({
      ...prevState,
      items: items,
    }));
  };

  const saveAsDraft = async () => {
    try {
      const response = await axiosInstance.put("/", { formData });
      // setFormData({
      //   createdAt: "",
      //   paymentDue: "",
      //   description: "",
      //   paymentTerms: 1,
      //   clientName: "",
      //   clientEmail: "",
      //   status: "draft",
      //   senderAddress: {
      //     street: "",
      //     city: "",
      //     postCode: "",
      //     country: "",
      //   },
      //   clientAddress: {
      //     street: "",
      //     city: "",
      //     postCode: "",
      //     country: "",
      //   },
      //   items: [],
      //   total: 0,
      // });
      // setCheckedFormData({
      //   createdAt: false,
      //   paymentDue: false,
      //   description: false,
      //   paymentTerms: false,
      //   clientName: false,
      //   clientEmail: false,
      //   status: false,
      //   senderAddress: {
      //     street: false,
      //     city: false,
      //     postCode: false,
      //     country: false,
      //   },
      //   clientAddress: {
      //     street: false,
      //     city: false,
      //     postCode: false,
      //     country: false,
      //   },
      //   items: [],
      //   total: false,
      // });
      setIsFormVisible(false);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveAndSend = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put("/", {
        formData,
        message: "pending",
      });
      // setFormData({
      //   createdAt: "",
      //   paymentDue: "",
      //   description: "",
      //   paymentTerms: 1,
      //   clientName: "",
      //   clientEmail: "",
      //   status: "draft",
      //   senderAddress: {
      //     street: "",
      //     city: "",
      //     postCode: "",
      //     country: "",
      //   },
      //   clientAddress: {
      //     street: "",
      //     city: "",
      //     postCode: "",
      //     country: "",
      //   },
      //   items: [
      //     {
      //       name: "0",
      //       quantity: 0,
      //       price: 0,
      //       total: 0,
      //     },
      //     {
      //       name: "",
      //       quantity: 0,
      //       price: 0,
      //       total: 0,
      //     },
      //   ],
      //   total: 0,
      // });
      //  setCheckedFormData({
      //   createdAt: false,
      //   paymentDue: false,
      //   description: false,
      //   paymentTerms: false,
      //   clientName: false,
      //   clientEmail: false,
      //   status: false,
      //   senderAddress: {
      //     street: false,
      //     city: false,
      //     postCode: false,
      //     country: false,
      //   },
      //   clientAddress: {
      //     street: false,
      //     city: false,
      //     postCode: false,
      //     country: false,
      //   },
      //   items: [],
      //   total: false,
      // });

      setIsFormVisible(false);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkErorrs = async () => {
    let findFieldsErrors;
    let findItemError = document.querySelector(".form__fourfold");

    for (const key in formData) {
      if (formData[key] === "") {
        findFieldsErrors = true;
      }
    }

    for (const key in formData.senderAddress) {
      if (formData.senderAddress[key] === "") {
        findFieldsErrors = true;
      }
    }

    for (const key in formData.clientAddress) {
      if (formData.clientAddress[key] === "") {
        findFieldsErrors = true;
      }
    }

    for (const key in formData.items) {
      if (
        formData.items[key].name === "" ||
        formData.items[key].quantity === "" ||
        formData.items[key].price === ""
      ) {
        findFieldsErrors = true;
      }
    }

    if (findFieldsErrors) {
      setErrors((prevState) => ({
        ...prevState,
        fieldsError: "- All fields must be added",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        fieldsError: "",
      }));
    }

    if (findItemError) {
      setErrors((prevState) => ({
        ...prevState,
        itemError: "",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        itemError: "- An item must be added",
      }));
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/", {
        formData,
        _id,
      });

      if (response.status === 200) {
        setDetailInvoice(response.data);
        setIsFormVisible(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const today = createTodaysDate(new Date());

    const someDate = new Date(today);
    const numberOfDaysToAdd = 1;
    const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

    let myDate = new Date(result);
    let paymentDue = formData;

    paymentDue = createTodaysDate(myDate);

    setFormData((prevState) => ({
      ...prevState,
      createdAt: today,
      paymentDue: paymentDue,
    }));
  }, []);

  useEffect(() => {
    checkErorrs();
  }, [formData]);

  return (
    <div className="form">
      <h2> {_id ? `Edit ${_id.slice(0, 7)}` : "New Invoice"} </h2>

      <form onSubmit={(e) => saveAndSend(e)}>
        <p>Bill From</p>

        <div
          className={`input-container ${
            !formData.senderAddress.street &&
            checkedFormData.senderAddress.street
              ? "input-container--wrong"
              : ""
          } `}
        >
          <label htmlFor="streetFrom">
            <span>Street Address</span>
            <span>
              {!formData.senderAddress.street &&
              checkedFormData.senderAddress.street
                ? `can't be empty`
                : ""}
            </span>
          </label>
          <input
            onChange={(e) => changeFormData(e, "", "street")}
            type="text"
            id="streetFrom"
            name="senderAddress"
            value={formData.senderAddress.street}
            required={true}
          />
        </div>

        <div className="form__multiple">
          <div
            className={`input-container ${
              !formData.senderAddress.city && checkedFormData.senderAddress.city
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="cityFrom" className="form__input">
              <span>City</span>
              <span>
                {!formData.senderAddress.city &&
                checkedFormData.senderAddress.city
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              onChange={(e) => changeFormData(e, "", "city")}
              type="text"
              id="cityFrom"
              name="senderAddress"
              value={formData.senderAddress.city}
              required={true}
            />
          </div>

          <div
            className={`input-container ${
              !formData.senderAddress.postCode &&
              checkedFormData.senderAddress.postCode
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="postCodeFrom" className="form__input">
              <span> Post Code</span>
              <span>
                {!formData.senderAddress.postCode &&
                checkedFormData.senderAddress.postCode
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              onChange={(e) => changeFormData(e, "", "postCode")}
              type="text"
              id="postCodeFrom"
              name="senderAddress"
              value={formData.senderAddress.postCode}
              required={true}
            />
          </div>

          <div
            className={`input-container ${
              !formData.senderAddress.country &&
              checkedFormData.senderAddress.country
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="countryFrom" className="form__input">
              <span>Country</span>
              <span>
                {!formData.senderAddress.country &&
                checkedFormData.senderAddress.country
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              onChange={(e) => changeFormData(e, "", "country")}
              type="text"
              id="countryFrom"
              name="senderAddress"
              value={formData.senderAddress.country}
              required={true}
            />
          </div>
        </div>

        <p>Bill To</p>

        <div
          className={`input-container ${
            !formData.clientName && checkedFormData.clientName
              ? "input-container--wrong"
              : ""
          } `}
        >
          <label htmlFor="clientName">
            <span>Client's Name</span>
            <span>
              {!formData.clientName && checkedFormData.clientName
                ? `can't be empty`
                : ""}
            </span>
          </label>
          <input
            value={formData.clientName}
            type="text"
            id="clientName"
            name="clientName"
            onChange={changeFormData}
            required={true}
          />
        </div>

        <div
          className={`input-container ${
            !formData.clientEmail && checkedFormData.clientEmail
              ? "input-container--wrong"
              : ""
          } `}
        >
          <label htmlFor="clientEmail">
            <span> Client's Email</span>
            <span>
              {!formData.clientEmail && checkedFormData.clientEmail
                ? `can't be empty`
                : ""}
            </span>
          </label>
          <input
            value={formData.clientEmail}
            type="email"
            id="clientEmail"
            name="clientEmail"
            onChange={changeFormData}
            required={true}
          />
        </div>

        <div
          className={`input-container ${
            !formData.clientAddress.street &&
            checkedFormData.clientAddress.street
              ? "input-container--wrong"
              : ""
          } `}
        >
          <label htmlFor="streetTo">
            <span> Street Address</span>
            <span>
              {!formData.clientAddress.street &&
              checkedFormData.clientAddress.street
                ? `can't be empty`
                : ""}
            </span>
          </label>
          <input
            value={formData.clientAddress.street}
            type="text"
            id="streetTo"
            name="clientAddress"
            onChange={(e) => changeFormData(e, "", "street")}
            required={true}
          />
        </div>

        <div className="form__multiple">
          <div
            className={`input-container ${
              !formData.clientAddress.city && checkedFormData.clientAddress.city
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="cityTo" className="form__input">
              <span>City</span>
              <span>
                {!formData.clientAddress.city &&
                checkedFormData.clientAddress.city
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              value={formData.clientAddress.city}
              type="text"
              id="cityTo"
              name="clientAddress"
              onChange={(e) => changeFormData(e, "", "city")}
              required={true}
            />
          </div>

          <div
            className={`input-container ${
              !formData.clientAddress.postCode &&
              checkedFormData.clientAddress.postCode
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="postCodeTo" className="form__input">
              <span>Post Code</span>
              <span>
                {!formData.clientAddress.postCode &&
                checkedFormData.clientAddress.postCode
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              value={formData.clientAddress.postCode}
              onChange={(e) => changeFormData(e, "", "postCode")}
              type="text"
              id="postCodeTo"
              name="clientAddress"
              required={true}
            />
          </div>

          <div
            className={`input-container ${
              !formData.clientAddress.country &&
              checkedFormData.clientAddress.country
                ? "input-container--wrong"
                : ""
            } `}
          >
            <label htmlFor="countryTo" className="form__input">
              <span>Country</span>
              <span>
                {!formData.clientAddress.country &&
                checkedFormData.clientAddress.country
                  ? `can't be empty`
                  : ""}
              </span>
            </label>
            <input
              value={formData.clientAddress.country}
              onChange={(e) => changeFormData(e, "", "country")}
              type="text"
              id="countryTo"
              name="clientAddress"
              required={true}
            />
          </div>
        </div>

        {/* Pozostałe */}
        <div className="form__double">
          <div className="input-container">
            <label htmlFor="createdAt" className="form__input">
              Issue Date
            </label>
            <input
              value={formData.createdAt}
              onChange={changeFormData}
              type="date"
              id="createdAt"
              name="createdAt"
              required={true}
            />
          </div>

          <div className="input-container">
            <label htmlFor="paymentTerms" className="form__input">
              Payment Terms
            </label>
            <select
              onChange={changeFormData}
              name="paymentTerms"
              id="paymentTerms"
            >
              <option value={1}>Next 1 Day</option>
              <option value={7}>Next 7 Days</option>
              <option value={14}>Next 14 Days</option>
              <option value={30}>Next 30 Days</option>
            </select>
          </div>
        </div>

        <div
          className={`input-container ${
            !formData.description && checkedFormData.description
              ? "input-container--wrong"
              : ""
          } `}
        >
          <label htmlFor="description" className="form__input">
            <span> Project Description</span>
            <span>
              {!formData.description && checkedFormData.description
                ? `can't be empty`
                : ""}
            </span>
          </label>
          <input
            value={formData.description}
            onChange={changeFormData}
            type="text"
            id="description"
            name="description"
            required={true}
          />
        </div>

        <h3>Item List</h3>
        <div className="items-container">
          {formData.items.map((item, index) => (
            <Item
              changeFormData={changeFormData}
              name="item"
              key={index}
              item={item}
              index={index}
              deleteItem={deleteItem}
              formData={formData}
              checkedFormData={checkedFormData}
            />
          ))}
        </div>

        <button
          className="form__button gray-button"
          type="button"
          onClick={addItem}
        >
          + Add New Item
        </button>

        <div className="errors">
          <span className="errors__text"> {errors.fieldsError}</span>
          <span className="errors__text"> {errors.itemError}</span>
        </div>

        <div className="form__buttons">
          {_id ? (
            <div className="form__buttons__twice">
              <button
                className="gray-button"
                onClick={() => setIsFormVisible(false)}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={(e) => saveChanges(e)}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <button
                className="gray-button"
                onClick={() => setIsFormVisible(false)}
              >
                Discard
              </button>
              <div className="form__buttons__multiple">
                <button className="draft-button" onClick={() => saveAsDraft()}>
                  Save as Draft
                </button>
                <button className="primary-button" type="submit">
                  Save {"&"} Send
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
