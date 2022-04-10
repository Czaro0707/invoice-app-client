import noPicture from "../images/illustration.svg";

const NoInvoicesPicture = () => {
  return (
    <div className="no-invoices">
      <img src={noPicture} alt="no-invoices" />
      <h1>There is nothing here</h1>
      <p>
        Create an invoice by clicking the <strong> New button </strong> and get
        started
      </p>
    </div>
  );
};

export default NoInvoicesPicture;
