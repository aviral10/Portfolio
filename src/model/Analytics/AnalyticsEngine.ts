interface AnalyticsEngine{
    sendPageView(pageName:string):void;
    sendEvent(event:any):void;
}

export default AnalyticsEngine