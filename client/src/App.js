// IMPORTING THE NECESSARY PACKAGE AND DEPENDENCIES
import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import { HandlerRoutes } from "./components";

// DEFING THE APP STYLE
const APP_STYLE = {
  width: "100%",
  overflow: "hidden",
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Mulish"],
      },
    });

    // when ever app loads check if the user is login or not
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="App" style={APP_STYLE}>
      <HandlerRoutes />
    </div>
  );
};

export default App;
