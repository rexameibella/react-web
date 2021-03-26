import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";

import OpenInNew from '@material-ui/icons/OpenInNew';
import useStates from "../states";

export const ApplicationMenu = (menus) => {
  const [state, actions] = useStates();

  const applicationMenuRenderer = [];

  for (const [index, value] of menus.entries()) {
    if(value.isMenu) {
      applicationMenuRenderer.push(<a key={"application" + index} href={value.link} target="_blank" style={{textDecoration: 'none', color: '#333'}}>
        <MenuItem style={{fontSize: 14}}>
          {value.name} <OpenInNew style={{fontSize: 14, marginLeft: 3, color: '#333333'}} />
        </MenuItem>
      </a>);
    } else {
      applicationMenuRenderer.push(<Divider key={"divider" + index} />);
    }
  }

  return (<Menu
    anchorEl={state.applicationsMenu}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    open={state.applicationsMenuOpen}
    onClose={actions.handleMenuClose}
    disableAutoFocusItem={true}>
      {applicationMenuRenderer}
  </Menu>);
};
