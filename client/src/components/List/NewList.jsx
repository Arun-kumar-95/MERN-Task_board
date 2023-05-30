import React, { useState, useEffect, Fragment } from "react";
import { MdAdd } from "react-icons/md";
import "./newlist.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  clearMessage,
  createNewList,
  getAllUserList,
} from "../../actions/listAction";
import { useAlert } from "react-alert";
import { Loader } from "../../components";

const NewList = () => {
  const { error, loading, message } = useSelector((state) => state.list);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch, loading]);

  const [newList, setNewList] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewList(newList));
    dispatch(getAllUserList());
  };

  return (
    <div className="create-list">
      <div className="title">
        <p>Create New List</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="listname"
          placeholder="Enter list name"
          required
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          autoComplete="off"
        />

        <button type="submit" name="btn-submit" className="btn">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MdAdd />
              <span>Create List</span>
            </Fragment>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewList;
