using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TestTask
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "GetModeList",
               url: "getModeList",
               defaults: new { controller = "Home", action = "GetModeList" }
            );

            routes.MapRoute(
               name: "GetLineList",
               url: "getLineList/{modeName}",
               defaults: new { controller = "Home", action = "GetLineList" }
            );

            routes.MapRoute(
               name: "GetStopPointList",
               url: "getStopPointList/{lineId}",
               defaults: new { controller = "Home", action = "GetStopPointList" }
            );

            routes.MapRoute(
               name: "GetTimetableList",
               url: "getTimetableList/{lineId}/{stopPointId}",
               defaults: new { controller = "Home", action = "GetTimetableList" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
