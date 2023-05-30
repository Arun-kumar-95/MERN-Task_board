import React, { useEffect } from "react";
import "./item.css";
import { MdDelete } from "react-icons/md";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  clearMessage,
  deleteItemFromList,
  updateItemToList,
} from "../../actions/itemAction";

const Item = ({ list, listId }) => {
  const { loading, error, message } = useSelector((state) => state.item);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (message) {
      alert.success(message);
      dispatch(clearMessage);
    }
  }, [error, message, dispatch]);

  const handleItemChange = (id, listId) => {
    console.log(id, listId);
    dispatch(updateItemToList(id, listId));
  };

  const handleDelete = (id, listId) => {
    dispatch(deleteItemFromList(id, listId));
  };

  const dragItemStarted = (e, _id, lid) => {
    // console.log("drag start: " + _id);
    e.dataTransfer.setData("itemid", _id);
    e.dataTransfer.setData("oldListId", lid);
  };

  return (
    <div
      className={loading ? "item skeleton " : "item"}
      id={list._id}
      draggable={true}
      onDragStart={(e) => dragItemStarted(e, list._id, listId)}
    >
      <input
        type="checkbox"
        checked={list.isCompleted}
        dataid={list._id}
        onChange={() => handleItemChange(list._id, listId)}
      />
      <span>{list.item}</span>
      <button
        className="deletItem"
        onClick={() => handleDelete(list._id, listId)}
      >
        <MdDelete />
      </button>
    </div>
  );
};

export default Item;
