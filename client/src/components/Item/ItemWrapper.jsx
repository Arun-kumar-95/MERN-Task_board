import React, { useState, Fragment, useEffect } from "react";
import "./itemwrapper.css";

import { MdClose, MdAdd } from "react-icons/md";
import { CreateItem, Item } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import {
  clearErrors,
  clearMessage,
  getAllUserList,
  removeList,
  updateListItem,
} from "../../actions/listAction";

const ItemWrapper = ({ lists }) => {
  const { error, loading, message } = useSelector((state) => state.list);
  const [newListId, setNewListId] = useState("");

  const [listData, setListId] = useState({
    id: "",
    isOpen: false,
  });

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [error, dispatch, newListId]);

  // HANDLE REMOVE LIST
  const handleRemoveList = (listId) => {
    dispatch(removeList(listId));
    dispatch(getAllUserList());
  };

  // DRAG ITEM OVER
  const draggingItemOver = (e, lid) => {
    e.preventDefault();
    // console.log(lid);
    setNewListId(lid);
  };

  const dropItemStarted = (e) => {
    let _id = e.dataTransfer.getData("itemid");
    let oldListId = e.dataTransfer.getData("oldListId");

    dispatch(updateListItem(oldListId, newListId, _id));
  };

  return (
    <Fragment>
      <div
        className="item-wrapper"
        key={lists._id}
        id={lists._id}
        onDragOver={(e) => draggingItemOver(e, lists._id)}
        onDrop={(e) => dropItemStarted(e)}
      >
        <div className="item-title">
          <p>{lists.listname}</p>
          <span
            className="remove-list"
            onClick={() => handleRemoveList(lists._id)}
            wrap-id={lists._id}
          >
            <MdClose />
          </span>
        </div>
        <div className="item-container">
          {lists && lists.items.length > 0
            ? lists.items.map((list, index) => (
                <Item list={list} key={list._id} listId={lists._id} />
              ))
            : null}

          <button
            type="submit"
            name="btn-submit"
            className="btn btnCreate"
            id={lists._id}
            onClick={() =>
              setListId((prev) => ({
                ...prev,
                id: lists._id,
                isOpen: true,
              }))
            }
          >
            <MdAdd />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {listData.isOpen && (
        <CreateItem listData={listData} setListId={setListId} />
      )}
    </Fragment>
  );
};

export default ItemWrapper;
