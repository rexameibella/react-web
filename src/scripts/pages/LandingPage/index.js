import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

if(cookies.get('t')) {
  alert('ada token');
}

ReactDOM.render(<Login />, document.getElementById("App"));
