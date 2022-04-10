import Invoice from "./Invoice";
import NoInvoicesPicture from "./NoInvoicesPicture";

const InvoiceList = ({
  invoicesDB,
  setIsFormVisible,
  detailInvoice,
  setDetailInvoice,
}) => {
  const sortedInoicesDB = invoicesDB.sort(function (a, b) {
    return new Date(b.paymentDue) - new Date(a.paymentDue);
  });

  const invoicesDOM = sortedInoicesDB.map((invoice, index) => (
    <Invoice
      detailInvoice={detailInvoice}
      setDetailInvoice={setDetailInvoice}
      key={index}
      invoice={invoice}
      setIsFormVisible={setIsFormVisible}
    />
  ));

  return (
    <div className="invoice-list">
      {invoicesDOM.length ? invoicesDOM : <NoInvoicesPicture />}
    </div>
  );
};

export default InvoiceList;
