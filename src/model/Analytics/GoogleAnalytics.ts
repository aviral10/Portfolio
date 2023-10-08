import AnalyticsEngine from "./AnalyticsEngine";
import ReactGA from "react-ga4";

class GoogleAnalytics implements AnalyticsEngine {
    constructor() {
        const TRACKING_ID = process.env.GOOGLE_ANALYTICS_TRACKING_ID;
        ReactGA.initialize(TRACKING_ID);
    }

    sendMessage(message: string, page: string): void {
        ReactGA.event({
            category: "User Interaction",
            action: page,
            label: message,
        });
    }

    sendLinkClick(link: string, title: string): void {
        ReactGA.event({
            category: "Link Click",
            action: title,
            label: link,
        });
    }

    sendPageView(pageName: string): void {
        ReactGA.send({
            hitType: "pageview",
            page: pageName,
            title: pageName.split("-").join(" "),
        });
    }

    sendEvent(width:string, height:string): void {
        ReactGA.event({
            category: "Screen",
            action: width,
            label: height,
        });
    }
}

export default GoogleAnalytics;
