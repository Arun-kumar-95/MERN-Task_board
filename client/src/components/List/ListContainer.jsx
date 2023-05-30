import React, { useEffect } from "react";
import "./listContainer.css";
import { ItemWrapper } from "../../components";
import { useSelector } from "react-redux";
import { trusted } from "mongoose";

const STYLE = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  marginTop: "10px",
  position: "relative",
};

const ListContainer = () => {
  const { lists, error } = useSelector((state) => state.userList);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [lists]);

  return (
    <div className="list-container" style={STYLE}>
      {lists &&
        lists.map((list) => <ItemWrapper lists={list} key={list._id} />)}
    </div>
  );
};

export default ListContainer;
