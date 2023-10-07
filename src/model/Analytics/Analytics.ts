import AnalyticsEngine from "./AnalyticsEngine";
import GoogleAnalytics from "./GoogleAnalytics";
import AdobeAnalytics from "./AdobeAnalytics";

class Analytics{
    public analyticsEngines:AnalyticsEngine[];
    private static instance:Analytics;

    private constructor(){
        this.analyticsEngines = [new AdobeAnalytics(), new GoogleAnalytics()]
    }

    public static getInstance(){
        this.instance?null:this.instance=new Analytics()
        return this.instance
    }

    public static sendPageView(pageName: string){
        Analytics.getInstance().analyticsEngines.map((engine)=>{
            try{
                engine.sendPageView(pageName)
            }catch(err){
                //
            }
        })
    }

    public static sendEvent(obj:any){
        Analytics.getInstance().analyticsEngines.map((engine)=>{
            try{
                engine.sendPageView(obj)
            }catch(err){
                //
            }
        })
    }

    public static sendMessage(message: string, page: string){
        Analytics.getInstance().analyticsEngines.map((engine)=>{
            try{
                engine.sendMessage(message, page)
            }catch(err){
                //
            }
        })
    }

    public static sendLinkClick(link: string, page: string){
        Analytics.getInstance().analyticsEngines.map((engine)=>{
            try{
                engine.sendLinkClick(link, page)
            }catch(err){
                //
            }
        })
    }
}

export default Analytics;