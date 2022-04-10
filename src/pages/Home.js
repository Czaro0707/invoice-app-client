import Header from "../components/Header";
import Main from "../components/Main";
import Form from "../components/Form";
import { useState, useEffect } from "react";
import { axiosInstance } from "../config";

const Home = ({
  setIsFormVisible,
  isFormVisible,
  setTheme,
  theme,
  detailInvoice,
  setDetailInvoice,
}) => {
  const [invoicesDB, setInvoicesDB] = useState([]);

  const getInvoicesDB = async () => {
    console.log(axiosInstance);
    try {
      const response = await axiosInstance.get("/");
      setInvoicesDB(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInvoicesDB();
  }, []);

  return (
    <div className="home">
      <Header
        setTheme={setTheme}
        theme={theme}
        setIsFormVisible={setIsFormVisible}
      />
      <Main
        detailInvoice={detailInvoice}
        setDetailInvoice={setDetailInvoice}
        invoicesDB={invoicesDB}
        setIsFormVisible={setIsFormVisible}
        setInvoicesDB={setInvoicesDB}
      />
      {isFormVisible ? <Form setIsFormVisible={setIsFormVisible} /> : ""}
    </div>
  );
};

export default Home;
