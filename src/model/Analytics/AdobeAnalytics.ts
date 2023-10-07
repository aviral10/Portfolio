import AnalyticsEngine from "./AnalyticsEngine";

declare function s_gi(id:string): void;
class AdobeAnalytics implements AnalyticsEngine{
    private TRACKING_ID:string
    private s:any
    constructor(){
        this.TRACKING_ID = process.env.ADOBE_ANALYTICS_TRACKING_ID;
        this.s=s_gi(this.TRACKING_ID);
        this.s.trackingServer=process.env.ADOBE_ANALYTICS_TRACKING_SERVER
        this.s.prop8 = navigator.userAgent
    }

    sendPageView(pageName: string): void {
        this.s.prop6 = pageName
        this.s.pageName = pageName
        this.s.t()
    }

    sendEvent(event: any): void {
        // To be implemented
    }

    sendMessage(message: string, page: string): void {
        this.s.evar8 = message
        this.s.pageName = page
        this.s.t()
    }

    sendLinkClick(link:string, title:string){
        this.s.prop7 = link
        this.s.pageName = title
        this.s.tl(true,"e",link);
    }
}

export default AdobeAnalytics;