import React, { useRef, useState, useEffect } from "react";
import "../../styles/form.css";
import { Logo } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Loader } from "../../components";
const Login = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated]);

  // HANDLE FORM INPUTS
  const handleFormInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(login(formData));
  };

  return (
    <div className="form-container">
      <Logo />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">User name:</label>
          <input
            type="text"
            placeholder="Enter your email"
            required
            value={formData.userId}
            name="userId"
            onChange={handleFormInput}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={formData.password}
            name="password"
            onChange={handleFormInput}
            autoComplete="off"
          />
        </div>

        <button type="submit" name="btn-submit" className="btn btnSubmit">
          {loading ? <Loader /> : <span>Login</span>}
        </button>
      </form>
    </div>
  );
};

export default Login;
