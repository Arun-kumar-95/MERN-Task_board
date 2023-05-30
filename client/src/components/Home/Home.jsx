import React, { useEffect, Fragment , memo} from "react";
import "./home.css";
import { ListContainer, NewList } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserList } from "../../actions/listAction";
import { useAlert } from "react-alert";

const HOME_STYLE = {
  height: "89vh",
  overflowX: "auto",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};

const Home = () => {
  // console.log("hOME RENDER");
  const { lists, error, loading } = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    // dispatch  to get all the lists
    dispatch(getAllUserList());
  }, [error]);

  return (
    <div className="task-board-wrapper" style={HOME_STYLE}>
      <Fragment>
        <div className="task-wrapper">
          {lists && lists.length > 0 ? <ListContainer /> : null}
        </div>
        <NewList />
      </Fragment>
    </div>
  );
};

export default memo(Home);
