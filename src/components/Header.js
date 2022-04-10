import logo from "../images/logo.svg";
import avatar from "../images/image-avatar.jpg";
import { useNavigate } from "react-router-dom";

const Header = ({ setTheme, theme, setIsFormVisible }) => {
  let navigate = useNavigate();
  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <div className="header">
      <div
        className="header__logo"
        onClick={() => {
          setIsFormVisible(false);
          navigate("/invoice-app-client");
        }}
      >
        <img src={logo} alt="logo" />
      </div>
      <div className="header__multiple">
        <div className="header__multiple__icon-container">
          {theme === "light" ? (
            <i className="fas fa-moon" onClick={changeTheme}></i>
          ) : (
            <i className="fas fa-sun" onClick={changeTheme}></i>
          )}
        </div>
        <div className="header__multiple__avatar">
          <img src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Header;
