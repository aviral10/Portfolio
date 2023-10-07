import AnalyticsEngine from "./AnalyticsEngine";

class GoogleAnalytics implements AnalyticsEngine{
    sendPageView(pageName: string): void {
        throw new Error("Method not implemented.");
    }
    sendEvent(event: any): void {
        throw new Error("Method not implemented.");
    }
}

export default GoogleAnalytics;