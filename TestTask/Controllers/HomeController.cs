using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RestSharp;
using Tfl.Api.Presentation.Entities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TestTask.Models;

namespace TestTask.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetModeList()
        {
            return Json(RestHelper.GetModeList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetLineList(string modeName)
        {
            return Json(RestHelper.GetLineList(modeName), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetStopPointList(string lineId)
        {
            return Json(RestHelper.GetStopPointList(lineId), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetTimetableList(string lineId, string stopPointId)
        {
            return Json(RestHelper.GetTimetableList(lineId, stopPointId), JsonRequestBehavior.AllowGet);
        }
    }
}