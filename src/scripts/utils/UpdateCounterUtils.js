export default {
	update: (actions, type) => {
		if(type === 'pickupOrdersCount') {
			actions.get('order/hub/getPickupOrderReadyCount', 'pickupOrdersCount', 'count');
		} else if(type === 'pickupNotReadyCount') {
			actions.get('order/hub/getPickupOrderNotReadyCount', 'pickupNotReadyCount', 'count');
		} else if(type === 'pickupTripsCount') {
			actions.get('trip/getReadyToPickupCount', 'pickupTripsCount', 'count');
		} else if(type === 'inboundTripsCount') {
			actions.get('trip/getInboundTripsCount', 'inboundTripsCount', 'count');
		} else if(type === 'inboundCount') {
			actions.get('trip/getInboundCount', 'inboundCount', 'count');
		} else if(type === 'groupingCount') {
			actions.get('order/getOrderReceivedCount', 'groupingCount', 'count');
		} else if(type === 'outboundTripsCount') {
			actions.get('trip/getOutboundTripsCount', 'outboundTripsCount', 'count');
		}
	}
}