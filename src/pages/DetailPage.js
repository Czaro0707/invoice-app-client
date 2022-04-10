import Header from "../components/Header";
import Detail from "../components/Detail";
import DeleteModal from "../components/DeleteModal";
import Form from "../components/Form";
import { useState } from "react";

const DetailPage = ({
  detailInvoice,
  setIsFormVisible,
  isFormVisible,
  setDetailInvoice,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="detailPage">
        <Header setIsFormVisible={setIsFormVisible} />
        <Detail
          detailInvoice={detailInvoice}
          setDetailInvoice={setDetailInvoice}
          setIsFormVisible={setIsFormVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {isFormVisible ? (
          <Form
            setIsFormVisible={setIsFormVisible}
            detailInvoice={detailInvoice}
            setDetailInvoice={setDetailInvoice}
          />
        ) : (
          ""
        )}
        {isDeleteModalVisible ? (
          <DeleteModal
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDeleteModalVisible={setDeleteModalVisible}
            detailInvoice={detailInvoice}
          />
        ) : (
          ""
        )}
      </div>
      {isDeleteModalVisible ? <div className="detailPage--modal"></div> : ""}
    </>
  );
};

export default DetailPage;
