import Cookies from "universal-cookie";

export default {
	deleteCookie: (name) => {
		const cookies = new Cookies();

		cookies.remove(name, {
			domain: process.env.HUB_SESSION_DOMAIN
		});
	},
	deleteCookieAndReload: (name) => {
		const cookies = new Cookies();

		let isCookieDeleted = false;

		setInterval(() => {
			if(!isCookieDeleted) {
				cookies.remove(name, {
					domain: process.env.HUB_SESSION_DOMAIN,
					path: '/'
				});

				if(!cookies.get(name)) {
					isCookieDeleted = true;
				}

				if(isCookieDeleted) {
					window.location.reload();
				}
			}
		}, 250);
	}
};