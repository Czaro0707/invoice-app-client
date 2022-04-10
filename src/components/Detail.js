import ItemDetail from "../components/ItemDetail";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const Detail = ({
  setIsFormVisible,
  setDeleteModalVisible,
  isLoading,
  setIsLoading,
  detailInvoice,
  setDetailInvoice,
}) => {
  let navigate = useNavigate();

  const markAsPaid = async () => {
    setIsLoading("paid-loading");
    try {
      const response = await axiosInstance.post(
        `/invoice/${detailInvoice._id}`
      );

      if (response.status === 200) {
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  let {
    clientEmail,
    clientName,
    createdAt,
    description,
    paymentDue,
    status,
    total,
  } = detailInvoice;
  let { city, country, postCode, street } = detailInvoice.clientAddress;
  let {
    city: cityTo,
    country: countryTo,
    postCode: postCodeTo,
    street: streetTo,
  } = detailInvoice.senderAddress;

  let itemsInfo = detailInvoice.items;

  const rest = total % 2;
  return (
    <div className="detail">
      <p className="detail__title">
        <i className="fas fa-angle-left"></i>
        <span onClick={() => goBack()}>Go back</span>
      </p>
      <div className="detail__container detail__up">
        <div className="detail__up__title">Status</div>
        <div className={`detail__up__type ${status}`}>
          <i className="fas fa-circle"></i> {status}
        </div>

        <div className="detail__buttons">
          <button
            className="gray-button"
            onClick={() => setIsFormVisible(true)}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => setDeleteModalVisible(true)}
          >
            Delete
          </button>
          {isLoading === "paid-loading" ? (
            <button className="loading primary-button">
              <i className="fas fa-circle"></i>
              <i className="fas fa-circle"></i>
              <i className="fas fa-circle"></i>
            </button>
          ) : (
            <button
              className="primary-button"
              disabled={detailInvoice.status === "draft" ? true : false}
              onClick={markAsPaid}
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div className="detail__container detail__main">
        <div className="detail__main__sender">
          <div className="detail__main__sender__title">
            <p>
              #<strong>WT2381</strong>
            </p>
            <p>{description}</p>
          </div>
          <div className="detail__main__sender__info">
            <p>{street}</p>
            <p>{city}</p>
            <p>{postCode}</p>
            <p>{country}</p>
          </div>
        </div>

        <div className="detail__main__client">
          <div className="detail__main__client__date">
            <div className="detail__main__client__date__invoiceDate">
              <p>Invoice Date</p>
              <strong>{createdAt}</strong>
            </div>
            <div className="detail__main__client__date__paymentDue">
              <p>Payment Due</p>
              <strong>{paymentDue}</strong>
            </div>
          </div>
          <div className="detail__main__client__bill">
            <p className="detail__main__client__bill__title">Bill To</p>
            <p className="detail__main__client__bill__name">{clientName}</p>
            <div className="detail__main__client__bill__clientInfo">
              <p>{streetTo}</p>
              <p>{cityTo}</p>
              <p>{postCodeTo}</p>
              <p>{countryTo}</p>
            </div>
          </div>
          <div className="detail__main__client__email">
            <p>Sent to</p>
            <strong>{clientEmail}</strong>
          </div>
        </div>

        <div className="detail__main__items">
          <div className="detail__main__items__up">
            <div className="detail__main__items__up__titles">
              <p>Item Name</p>
              <p>QTY.</p>
              <p>Price</p>
              <p>Total</p>
            </div>
            {itemsInfo.map((item, key) => (
              <ItemDetail item={item} key={key} />
            ))}
          </div>
          <div className="detail__main__items__down">
            <p>Amount Due</p>
            <p>
              <i className="fas fa-pound-sign"></i>
              <strong> {rest === 0 ? `${total}.00` : `${total}`}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
