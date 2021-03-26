import axios from "axios";
import React from "react";

import Cookies from 'universal-cookie';
import UtilsCookie from "../utils/Cookie";
import moment from "moment";

const actions = {
	handleClick: (store, subMenuName) => {
		const states = {};

		for (let i = 0; i < 15; i++) {
			if (subMenuName !== "subMenu" + i) {
				const shouldClosedSubMenu = "subMenu" + i;

				states[shouldClosedSubMenu] = false;
			}
		}
		states['openedSubMenu'] = subMenuName;

		if (store.state[subMenuName]) {
			states[subMenuName] = null;
		}

		states[subMenuName] = !store.state[subMenuName];

		store.setState(states);
	},
	toggleDrawer: (store, event, side, open) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		store.setState({ open: open });
	},
	handleDrawerMenuClick: (store) => {
		store.setState({ open: !store.state['open'] });
	},
	closeDrawer: (store) => {
		store.setState({ open: false });
	},
	handleProfileMenuOpen: (store, target, isProfileMenuOpen) => {
		store.setState({ profileMenu: target, isProfileMenuOpen: isProfileMenuOpen });
	},
	handleMessageMenuOpen: (store, target, isMessageMenuOpen) => {
		store.setState({ messageMenu: target, isMessageMenuOpen: isMessageMenuOpen });
	},
	handleApplicationsMenuOpen: (store, target, isApplicationMenuOpen) => {
		store.setState({ applicationsMenu: target, applicationsMenuOpen: isApplicationMenuOpen });
	},
	handleMobileMenuOpen: (store, target) => {
		store.setState({ mobileMoreAnchorEl: target });
	},
	handleMobileMenuClose: (store) => {
		store.setState({ mobileMoreAnchorEl: null });
	},
	handleMenuClose: (store) => {
		store.setState({ profileMenu: null, isProfileMenuOpen: false });
		store.setState({ messageMenu: null, isMessageMenuOpen: false });
		store.setState({ applicationsMenu: null, applicationsMenuOpen: false });

		store.setState({ mobileMoreAnchorEl: null });
	},
	handleDrawerOpen: (store) => {
		if (store.state.openedSubMenu != null) {
			store.setState({ openedSubMenu: true });
		}

		store.setState({ drawerOpen: true });
	},
	handleDrawerClose: (store) => {
		if (store.state.openedSubMenu != null) {
			store.setState({ openedSubMenu: false });
		}

		store.setState({ drawerOpen: false });
	},

	setSelectedRecords: (store, dataName, data) => {
		store.setState({ [dataName + 'Selected']: data });
	},

	handleInputChange: (store, name, event) => {
		const state = {};

		state[name] = event.target.value;

		store.setState(state);
	},

	setStateObject: (store, object) => {
		store.setState(object);
	},

	setState: (store, name, value) => {
		store.setState({ [name]: value });
	},

	getData: (store, config, isLetThrough = false) => {
		if (store.state[config.dataName] === undefined || isLetThrough) {
			const state = {};

			if (isLetThrough) {
				store.setState({ [config.dataName]: undefined, [config.dataName + 'Loading']: true });
			}

			let index = 0;
			let filters = [];
			for (let i = 0; i < config.columns.length; i++) {
				let value = store.state[config.dataName + config.columns[i].id + 'Filter'];

				if (value && config.columns[i].filter && config.columns[i].filter.type && config.columns[i].filter.type === 'DATE_RANGE') {
					value = moment(value.split(' - ')[0], 'DD/MM/YYYY').format('YYYY-MM-DD') + '|' + moment(value.split(' - ')[1], 'DD/MM/YYYY').format('YYYY-MM-DD');
				}

				if (store.state[config.dataName + config.columns[i].id + 'Filter'] !== undefined && store.state[config.dataName + config.columns[i].id + 'Filter'] !== null && store.state[config.dataName + config.columns[i].id + 'Filter'] !== '' && store.state[config.dataName + config.columns[i].id + 'Filter'] !== '##########') {
					filters[i] = "filters[" + index + "][field]=" + (config.columns[i].sId ? config.columns[i].sId : config.columns[i].id) + "&"
						+ "filters[" + index + "][type]=" + (config.columns[i].filter && config.columns[i].filter.type ? config.columns[i].filter.type : 'text') + '&'
						+ "filters[" + index + "][comparison]=" + (config.columns[i].filter && config.columns[i].filter.comparison ? config.columns[i].filter.comparison : (config.columns[i].filter && config.columns[i].filter.type ? (config.columns[i].filter.type === 'DATE_RANGE' ? 'range' : 'eq') : 'startsWith')) + '&'
						+ "filters[" + index + "][value]=" + value;

					index++;
				}
			}

			filters = filters.filter(function (e) { return e });

			const cookies = new Cookies();

			return axios.get(process.env.HUB_API + config.urlPath + "?" + filters.join('&') + "&orderBy=" + config.orderBy + "&order=" + config.order + "&offset=" + (config.page * config.rowsPerPage) + "&limit=" + config.rowsPerPage, {
				headers: {
					'Authorization': "Bearer " + cookies.get(process.env.HUB_SESSION_KEY)
				}
			}).then(response => {
				state[config.dataName] = response.data.data.rows;
				state[config.dataName + "Count"] = response.data.data.count;
				state[config.dataName + 'Loading'] = false;

				store.setState(state);

				return response.data;
			}).catch(function (error) {
				if (error.response && error.response.status === 401) {
					//alert('Your token is not valid/expired. We will logged you out.');

					UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
				} else {
					state[config.dataName + 'Loading'] = false;

					store.setState(state);

					throw error;
				}
			});
		}
	},

	getDataPOST: (store, uri, config, data) => {
		const state = {};

		store.setState({ [config.dataName]: undefined, [config.dataName + 'Loading']: true });

		const cookies = new Cookies();

		data.orderBy = config.orderBy;
		data.order = config.order;
		data.offset = (config.page * config.rowsPerPage);
		data.limit = config.rowsPerPage;

		return axios.post(process.env.HUB_API + uri, data, {
			headers: {
				'Authorization': "Bearer " + cookies.get(process.env.HUB_SESSION_KEY)
			}
		}).then(response => {
			state[config.dataName] = response.data.data.rows;
			state[config.dataName + "Count"] = response.data.data.count;
			state[config.dataName + 'Loading'] = false;

			store.setState(state);

			return response.data;
		}).catch(function (error) {
			if (error.response && error.response.status === 401) {
				//alert('Your token is not valid/expired. We will logged you out.');

				UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			} else {
				state[config.dataName + 'Loading'] = false;

				store.setState(state);

				throw error;
			}
		});
	},

	getExports: (store, config) => {
		let index = 0;
		let filters = [];
		for (let i = 0; i < config.columns.length; i++) {
			if (store.state[config.dataName + config.columns[i].id + 'Filter'] !== undefined && store.state[config.dataName + config.columns[i].id + 'Filter'] !== null && store.state[config.dataName + config.columns[i].id + 'Filter'] !== '' && store.state[config.dataName + config.columns[i].id + 'Filter'] !== '##########') {
				filters[i] = "filters[" + index + "][field]=" + (config.columns[i].sId ? config.columns[i].sId : config.columns[i].id) + "&"
					+ "filters[" + index + "][type]=" + (config.columns[i].filter && config.columns[i].filter.type ? config.columns[i].filter.type : 'text') + '&'
					+ "filters[" + index + "][comparison]=" + (config.columns[i].filter && config.columns[i].filter.comparison ? config.columns[i].filter.comparison : (config.columns[i].filter && config.columns[i].filter.type ? 'eq' : 'startsWith')) + '&'
					+ "filters[" + index + "][value]=" + store.state[config.dataName + config.columns[i].id + 'Filter'];

				index++;
			}
		}

		filters = filters.filter(function (e) { return e });

		const cookies = new Cookies();

		return axios.get(process.env.HUB_API + config.urlPath + "?" + filters.join('&') + "&orderBy=" + config.orderBy + "&order=" + config.order + "&offset=" + (config.page * config.rowsPerPage) + "&limit=" + config.rowsPerPage, {
			headers: {
				'Authorization': "Bearer " + cookies.get(process.env.HUB_SESSION_KEY)
			}
		}).then(response => {
			return response.data;
		}).catch(function (error) {
			if (error.response && error.response.status === 401) {
				//alert('Your token is not valid/expired. We will logged you out.');

				UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			} else {
				throw error;
			}
		});
	},

	get: (store, url, dataName, subData) => {
		const cookies = new Cookies();

		if (dataName) {
			store.setState({ [dataName]: null });
		}

		return axios.get('http://api-landingpage.meansoft.localhost/' + url, {
			// headers: {
			// 	'Authorization': "Bearer " + cookies.get(process.env.HUB_SESSION_KEY)
			// }
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		}).then(response => {
			if (dataName) {
				store.setState({ [dataName]: subData ? response.data.data[subData] : response.data.data });
			}

			return response.data;
		}).catch(function (error) {
			if (error.response && error.response.status === 401) {
				//alert('Your token is not valid/expired. We will logged you out.');
				console.log(error)

				// UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			} else {
				throw error;
			}
		});
	},

	post: (store, url, data) => {
		// const cookies = new Cookies();

		return axios.post('http://api-landingpage.meansoft.localhost/' + url, data, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			}
		}).then(response => {
			return response.data;
		}).catch(function (error) {
			if (error.response && error.response.status === 401) {
				alert('Your token is not valid/expired. We will logged you out.');

				// UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			} else {
				if (error.response) {
					error.message = error.message + ' (' + error.response.data.rd + ')';
				}

				throw error;
			}
		});
	},

	login: (store, username, password) => {
		store.setState({ loginLoading: true });

		const data = {
			username: username,
			password: password
		};

		return axios.post(process.env.HUB_API + 'auth/signIn', data)
			.then(function (response) {
				store.setState({ loginLoading: false });

				store.setState({ errorDialogOpen: true });

				return response.data;
			})
			.catch(function (error) {
				store.setState({ loginLoading: false });

				throw error;
			});
	},

	openConfirmation: (store, title, message, handler) => {
		if (!store.state.confirmationOpen) {
			store.setState({ confirmationOpen: true, confirmationTitle: title, confirmationText: message, confirmationHandler: handler })
		}
	},

	closeConfirmation: (store) => {
		store.setState({ confirmationOpen: false })
	},

	openAlert: (store, title, message) => {
		if (!store.state.alertOpen) {
			store.setState({ alertOpen: true, alertTitle: title, alertMessage: message })
		}
	},

	closeAlert: (store) => {
		store.setState({ alertOpen: false })
	},

	openNotif: (store, title, message) => {
		if (!store.state.notifOpen) {
			store.setState({ notifOpen: true, notifTitle: title, notifMessage: message })
		}
	},

	closeNotif: (store) => {
		store.setState({ notifOpen: false })
	},


	openProgress: (store, title) => {
		if (!store.state.progressOpen) {
			store.setState({ progressOpen: true, progressTitle: title })
		}
	},

	closeProgress: (store) => {
		store.setState({ progressOpen: false })
	},

	openSnackBar: (store, content) => {
		if (!store.state.snackBarOpen) {
			store.setState({ snackBarOpen: true, snackBarContent: content })
		}
	},

	closeSnackBar: (store) => {
		store.setState({ snackBarOpen: false })
	},

	handleSetLabelWidth: (store, stateName, inputLabel) => {
		const state = {};

		state[stateName] = inputLabel.current.offsetWidth;

		store.setState(state);
	},

	getDataList: (store, config) => {
		const state = {};
		const cookies = new Cookies();

		return axios.get(process.env.HUB_API + config.urlPath + "?" + config.param + "=" + config.ID, {
			headers: {
				'Authorization': "Bearer " + cookies.get(process.env.HUB_SESSION_KEY)
			}
		}).then(response => {
			state[config.dataName] = response.data.data;

			store.setState(state);

			return response.data;
		}).catch(function (error) {
			if (error.response && error.response.status === 401) {
				//alert('Your token is not valid/expired. We will logged you out.');

				UtilsCookie.deleteCookieAndReload(process.env.HUB_SESSION_KEY);
			} else {
				throw error;
			}
		});

	},

	handleChecked: (store, name, event) => {
		const state = {};

		state[name] = event.target.checked;

		store.setState(state);
	},
	handleDateChange: (store, name, date) => {
		const state = {};

		state[name] = date;

		store.setState(state);
	},
};

export default actions;
