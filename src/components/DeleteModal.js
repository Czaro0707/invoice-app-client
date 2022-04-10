import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";

const DeleteModal = ({
  setDeleteModalVisible,
  detailInvoice,
  isLoading,
  setIsLoading,
}) => {
  let navigate = useNavigate();

  const deleteInvoice = async () => {
    setIsLoading("delete-loading");
    try {
      const response = await axiosInstance.put(`/invoice/${detailInvoice._id}`);

      if (response.status === 200) {
        setIsLoading(false);
        navigate("/invoice-app-client");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="delete-modal">
      <h1>Confirm Deletion</h1>
      <p>
        Are you sure you want to delete invoice #EZ3991? This action can not be
        undone.
      </p>
      <div className="buttons">
        <button
          className="gray-button"
          onClick={() => setDeleteModalVisible(false)}
        >
          Cancel
        </button>
        {isLoading === "delete-loading" ? (
          <button className="loading delete">
            <i className="fas fa-circle"></i>
            <i className="fas fa-circle"></i>
            <i className="fas fa-circle"></i>
          </button>
        ) : (
          <button className="delete" onClick={() => deleteInvoice()}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
