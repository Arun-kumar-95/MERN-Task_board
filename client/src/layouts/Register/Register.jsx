import React, { useState, useEffect, Fragment } from "react";
import "../../styles/form.css";
import { Logo } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register, clearMessage } from "../../actions/userAction";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Loader } from "../../components";

const Register = () => {
  const { error, loading, message } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    userId: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [error, message]);

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
    dispatch(register(formData));
    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <div className="form-container">
      <Logo />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            placeholder="Enter full name"
            required
            value={formData.full_name}
            name="full_name"
            onChange={handleFormInput}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User name:</label>
          <input
            type="text"
            placeholder="Create userid"
            required
            value={formData.userId}
            name="userId"
            onChange={handleFormInput}
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            placeholder="Mobile number"
            required
            value={formData.phone}
            name="phone"
            onChange={handleFormInput}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
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
          {loading ? <Loader /> : <Fragment>Register</Fragment>}
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5em",
          }}
        >
          Already have an account ?{" "}
          <Link
            to="/"
            className="active--link"
            style={{ textDecoration: "underline" }}
          >
            Try Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
