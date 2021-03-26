import React from "react";
import ReactDOM from "react-dom";
import Login from "./pages/LandingPage/Login";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

ReactDOM.render(<Login />, document.getElementById("App"));
