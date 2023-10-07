import AnalyticsEngine from "./AnalyticsEngine";
import GoogleAnalytics from "./GoogleAnalytics";

class Analytics{
    private static analyticsEngines:AnalyticsEngine[] = [new GoogleAnalytics()];

    public static sendPageView(pageName: string){
        this.analyticsEngines.map((engine)=>{
            engine.sendPageView(pageName)
        })
    }

    public static sendEvent(obj:any){
        this.analyticsEngines.map((engine)=>{
            engine.sendPageView(obj)
        })
    }
    
}

export default Analytics;