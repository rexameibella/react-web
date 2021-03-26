module.exports = [
  {
    name: "Hub Performance",
    icon: "DesktopMac",
    link: "/performance"
  },
	{
		name: "Pickup Orders",
		icon: "DirectionsBoat",
		openInStart: true,
		subMenus: [
			{
				name: "Ready to be Picked (Orders)",
				link: "/pickupOrders/ready",
				counterData: {
					data: 'pickupOrdersCount'
				}
			},
			{
				name: "Ready to be Picked (Trips)",
				link: "/pickupTrips/ready",
				counterData: {
					data: 'pickupTripsCount',
				}
			},
			{
				name: "Not Ready to be Picked",
				link: "/pickupOrders/notReady",
				counterData: {
					data: 'pickupNotReadyCount'
				}
			}
		]
	},
	{
		name: "Inbound Trips",
		icon: "HowToVote",
		link: "/inboundTrips",
		counterData: {
			data: 'inboundTripsCount'
		}
	},
	{
		name: "Inbound",
		icon: "Inbox",
		link: "/inbound",
		counterData: {
			data: 'inboundCount'
		}
	},
	{
		name: "Grouping",
		icon: "AllInbox",
		link: "/grouping",
		counterData: {
			data: 'groupingCount'
		}
	},
	{
		name: "Outbound Trips",
		icon: "AirportShuttle",
		link: "/outboundTrips",
		counterData: {
			data: 'outboundTripsCount'
		}
	},
	{
		name: "Trip History",
		icon: "History",
		link: "/tripHistories",
	},
];
