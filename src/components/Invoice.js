import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const Invoice = ({
  invoice,
  setIsFormVisible,
  detailInvoice,
  setDetailInvoice,
}) => {
  const { _id, paymentDue, clientName, total, status } = invoice;

  let navigate = useNavigate();

  const goToDetailPage = async () => {
    try {
      const response = await axiosInstance.get(`/invoice/${_id}`);

      if (response.status === 200) {
        setDetailInvoice(response.data[0]);
      }
    } catch (err) {
      console.log(err);
    }

    navigate(`/invoice-app-client/invoice/${_id}`);
    setIsFormVisible(false);
  };

  return (
    <div className="invoice" onClick={goToDetailPage}>
      <div className="invoice__id">
        #<strong>{_id.slice(0, 7)}</strong>
      </div>
      <div className="invoice__client-name">{clientName}</div>
      <div className="invoice__multiple">
        <div className="invoice__multiple__date">{paymentDue}</div>
        <div className="invoice__multiple__cost">
          <i className="fas fa-pound-sign"></i> {total}
        </div>
      </div>
      <div className="invoice__date">{paymentDue}</div>
      <div className="invoice__cost">
        <i className="fas fa-pound-sign"></i> {total}
      </div>

      <div className={`invoice__type ${status}`}>
        <i className="fas fa-circle"></i>
        {status}
      </div>
      <div className="invoice__detail">
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Invoice;
