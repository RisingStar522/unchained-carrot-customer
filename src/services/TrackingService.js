import * as uccSdk from 'ucc-sdk';

export const submitTrackingEvent = async (event, data, user) => {
    await uccSdk.track.submitEvent(
        process.env.VUE_APP_UCC_TRACKER_CUSTOMER_ID,
        window.location.hostname,
        event,
        data,
        user
    );
}
