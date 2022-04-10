import { useState } from "react";
import { axiosInstance } from "../config";

const Management = ({ setIsFormVisible, invoicesDB, setInvoicesDB }) => {
  const [showOptions, setShowOptions] = useState(false);
  const numberOfInvoices = invoicesDB.length;

  const filterInvoicesDB = async (type) => {
    try {
      const response = await axiosInstance.get("/", {
        params: {
          update: type,
        },
      });
      setInvoicesDB(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="management">
      <div className="management__title-container">
        <h2>Invoices</h2>
        <p className="small">0 invoices</p>
        <p className="big">
          There
          {numberOfInvoices > 1
            ? ` are ${numberOfInvoices} total invoices`
            : ` is ${numberOfInvoices} total invoice`}
        </p>
      </div>
      <div className="management__multiple">
        <div
          className="management__multiple__filter-container"
          onClick={() => setShowOptions((prevState) => !prevState)}
        >
          <p className="small-filter">Filter</p>
          <p className="big-filter">Filter by status</p>
          {showOptions ? (
            <i className="fas fa-chevron-down"></i>
          ) : (
            <i className="fas fa-chevron-up"></i>
          )}
          {showOptions ? (
            <div className="choices">
              <form>
                <div onClick={() => filterInvoicesDB("draft")}>
                  <input
                    type="radio"
                    name="invoice-choice"
                    id="draft"
                    value="draft"
                  />
                  <label htmlFor="draft">Draft</label>
                </div>
                <div onClick={() => filterInvoicesDB("pending")}>
                  <input
                    type="radio"
                    name="invoice-choice"
                    id="pending"
                    value="invoice-choice"
                  />
                  <label htmlFor="pending">Pending</label>
                </div>
                <div onClick={() => filterInvoicesDB("paid")}>
                  <input
                    type="radio"
                    name="invoice-choice"
                    id="paid"
                    value="paid"
                  />
                  <label htmlFor="paid">Paid</label>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className="management__multiple__button-container primary-button"
          onClick={() => setIsFormVisible(true)}
        >
          <i className="fas fa-plus"></i>

          <p className="small">New</p>
          <p className="big">New Invoice</p>
        </div>
      </div>
    </div>
  );
};

export default Management;
