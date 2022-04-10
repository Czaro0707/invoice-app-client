import Management from "./Management";
import InvoiceList from "./InvoiceList";

const Main = ({
  setIsFormVisible,
  invoicesDB,
  setInvoicesDB,
  detailInvoice,
  setDetailInvoice,
}) => {
  return (
    <div className="main-wrapper">
      <div className="main">
        <div className="invoice-list">
          <Management
            setInvoicesDB={setInvoicesDB}
            setIsFormVisible={setIsFormVisible}
            invoicesDB={invoicesDB}
          />
          <InvoiceList
            detailInvoice={detailInvoice}
            setDetailInvoice={setDetailInvoice}
            invoicesDB={invoicesDB}
            setIsFormVisible={setIsFormVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
