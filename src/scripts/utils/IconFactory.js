import React from "react";

import {
  StarBorder,
  Receipt,
  Dashboard,
  MoveToInbox,
  HowToVote,
  AllInbox,
  StoreMallDirectory,
  More,
  Bookmarks,
  MonetizationOn,
  LibraryBooks,
  SupervisorAccount,
  Security,
  Room,
  Store,
  Motorcycle,
  LocalShipping,
  Traffic,
  LocalOffer,
  LocalMall,
  Business,
  DesktopMac,
  ExitToApp,
  Storage,
  Dns,
	AddBox,
	Archive,
	Alarm,
	Replay,
	Cached,
  Assignment,
  Unarchive,
  LocationOn,
  ArrowBack,
	Build,
	CardTravel,
	Backup,
	Refresh,
	AccessAlarm,
	AccountBox,
	History,
	AirportShuttle,
	DirectionsBoat,
	Inbox,
	BlurCircular,
	ArrowBackIos
} from "@material-ui/icons";

export const iconFactory = (iconString, size, color = '#888888', styleParams = {}) => {
	const styles = {...styleParams, ...{fontSize: size, color: color}};

  if(iconString === "StarBorder") {
    return (<StarBorder style={styles} />);
  } else if(iconString === "Receipt") {
    return (<Receipt style={styles} />);
  } else if(iconString === "Dashboard") {
    return (<Dashboard style={styles} />);
  } else if(iconString === "MoveToInbox") {
    return (<MoveToInbox style={styles} />);
  } else if(iconString === "HowToVote") {
    return (<HowToVote style={styles} />);
  } else if(iconString === "AllInbox") {
    return (<AllInbox style={styles} />);
  } else if(iconString === "StoreMallDirectory") {
    return (<StoreMallDirectory style={styles} />);
  } else if(iconString === "More") {
    return (<More style={styles} />);
  } else if(iconString === "Bookmarks") {
    return (<Bookmarks style={styles} />);
  } else if(iconString === "MonetizationOn") {
    return (<MonetizationOn style={styles} />);
  } else if(iconString === "LibraryBooks") {
    return (<LibraryBooks style={styles} />);
  } else if(iconString === "SupervisorAccount") {
    return (<SupervisorAccount style={styles} />);
  } else if (iconString === "Security") {
    return (<Security style={styles} />);
  } else if (iconString === "Room") {
    return (<Room style={styles} />);
  } else if (iconString === "Store") {
    return (<Store style={styles} />);
  } else if (iconString === "Motorcycle") {
    return (<Motorcycle style={styles} />);
  } else if (iconString === "LocalShipping") {
    return (<LocalShipping style={styles} />);
  } else if (iconString === "Traffic") {
    return (<Traffic style={styles} />);
  } else if (iconString === "LocalOffer") {
    return (<LocalOffer style={styles} />);
  } else if (iconString === "LocalMall") {
    return (<LocalMall style={styles} />);
  } else if (iconString === "Business") {
    return (<Business style={styles} />);
  } else if (iconString === "DesktopMac") {
    return (<DesktopMac style={styles} />);
  } else if (iconString === "ExitToApp") {
    return (<ExitToApp style={styles} />);
  } else if (iconString === "Storage") {
    return (<Storage style={styles} />);
  } else if (iconString === "Dns") {
    return (<Dns style={styles} />);
  } else if (iconString === "AddBox") {
		return (<AddBox style={styles} />);
	} else if (iconString === "Archive") {
		return (<Archive style={styles} />);
	} else if (iconString === "Alarm") {
		return (<Alarm style={styles} />);
	} else if (iconString === "Replay") {
		return (<Replay style={styles} />);
	} else if (iconString === "Cached") {
		return (<Cached style={styles} />);
	} else if (iconString === "Assignment") {
		return (<Assignment style={styles} />);
	} else if (iconString === "Unarchive") {
		return (<Unarchive style={styles} />);
	} else if (iconString === "LocationOn") {
		return (<LocationOn style={styles} />);
	} else if (iconString === "ArrowBack") {
    return (<ArrowBack style={styles} />);
  } else if (iconString === "Build") {
		return (<Build style={styles} />);
	} else if (iconString === "CardTravel") {
		return (<CardTravel style={styles} />);
	} else if (iconString === "Backup") {
		return (<Backup style={styles} />);
	} else if (iconString === "Refresh") {
		return (<Refresh style={styles} />);
	} else if (iconString === "AccessAlarm") {
		return (<AccessAlarm style={styles} />);
	} else if (iconString === "AccountBox") {
		return (<AccountBox style={styles} />);
	} else if (iconString === "History") {
		return (<History style={styles} />);
	} else if (iconString === "AirportShuttle") {
		return (<AirportShuttle style={styles} />);
	} else if (iconString === "DirectionsBoat") {
		return (<DirectionsBoat style={styles} />);
	} else if (iconString === "Inbox") {
		return (<Inbox style={styles} />);
	} else if (iconString === "ArrowBackIos") {
		return (<ArrowBackIos style={styles} />);
	} else {
		return (<BlurCircular style={styles} />);
	}
};
