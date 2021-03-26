import React from "react";
import states from './States';
import actions from "./Actions";
import useGlobalHook from "use-global-hook";

export default useGlobalHook(React, states, actions);
