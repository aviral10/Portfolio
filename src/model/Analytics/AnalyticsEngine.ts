interface AnalyticsEngine {
    sendPageView(pageName: string): void;
    sendEvent(event1: string, event2: string): void;
    sendLinkClick(link: string, page: string): void;
    sendMessage(message: string, page: string): void;
}

export default AnalyticsEngine;
