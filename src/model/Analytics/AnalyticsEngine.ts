interface AnalyticsEngine {
    sendPageView(pageName: string): void;
    sendEvent(event: any): void;
    sendLinkClick(link: string, page: string): void;
    sendMessage(message: string, page: string): void;
}

export default AnalyticsEngine;
