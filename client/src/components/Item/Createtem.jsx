import React, { useState, useEffect, Fragment } from "react";
import "./createItem.css";
import { MdAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Loader } from "../../components";
import { getAllUserList } from "../../actions/listAction";
import {
  clearErrors,
  addItemToList,
  clearMessage,
} from "../../actions/itemAction";

const CreateItem = ({ listData, setListId }) => {
  const { error, loading, message } = useSelector((state) => {
    console.log(state.item);
    return state.item;
  });

 
  const dispatch = useDispatch();
  const alert = useAlert();

  const [item, setItem] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [error, dispatch, message]);

  const handleCloseModal = () => {
    setListId((prev) => ({
      ...prev,
      id: "",
      isOpen: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCloseModal();
    dispatch(addItemToList(item, listData.id));
    dispatch(getAllUserList());
  };

  return (
    <div className="create-item-wrapper">
      <form className="new-item-form-container" onSubmit={handleSubmit}>
        <div className="close-modal" onClick={handleCloseModal}>
          <span className="close">&times;</span>
        </div>
        <label htmlFor="item">Item:</label>
        <input
          placeholder="Write item"
          type="text"
          required
          value={item}
          name="item"
          onChange={(e) => setItem(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn addItem">
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
export default CreateItem;
