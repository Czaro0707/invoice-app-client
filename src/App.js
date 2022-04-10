import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import { useState, useEffect } from "react";
import "./styles/index.scss";

const App = () => {
  const [detailInvoice, setDetailInvoice] = useState({
    clientAddress: {},
    senderAddress: {},
    items: [],
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="invoice-app-client"
            element={
              <Home
                detailInvoice={detailInvoice}
                setDetailInvoice={setDetailInvoice}
                setIsFormVisible={setIsFormVisible}
                isFormVisible={isFormVisible}
                setTheme={setTheme}
                theme={theme}
              />
            }
          ></Route>
          <Route
            path="invoice-app-client/invoice/:id"
            element={
              <DetailPage
                detailInvoice={detailInvoice}
                setDetailInvoice={setDetailInvoice}
                setIsFormVisible={setIsFormVisible}
                isFormVisible={isFormVisible}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
