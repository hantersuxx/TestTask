using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Tfl.Api.Presentation.Entities;
using TestTask.Models;

namespace TestTask.Models
{
    public static class RestHelper
    {
        public static string ApiEndpoint
        {
            get
            {
                return "https://api.tfl.gov.uk/";
            }
        }
        public static string AppId
        {
            get
            {
                return "19a58f7c";
            }
        }

        public static string AppKey
        {
            get
            {
                return "6a616942f04d2c34d39b0820038294b8";
            }
        }

        public static List<Mode> GetModeList()
        {
            var client = new RestClient(ApiEndpoint);
            var request = new RestRequest("Line/Meta/Modes", Method.GET);
            SetupRequest(request);
            var response = client.Execute<List<Mode>>(request);
            return response.Data;
        }

        public static List<Line> GetLineList(string modeName)
        {
            var client = new RestClient(ApiEndpoint);
            var request = new RestRequest($"Line/Mode/{modeName}", Method.GET);
            SetupRequest(request);
            var response = client.Execute<List<Line>>(request);
            return response.Data;
        }

        public static List<StopPoint> GetStopPointList(string lineId)
        {
            var client = new RestClient(ApiEndpoint);
            var request = new RestRequest($"Line/{lineId}/StopPoints", Method.GET);
            SetupRequest(request);
            var response = client.Execute<List<StopPoint>>(request);
            return response.Data;
        }

        public static TimetableResponse GetTimetableList(string lineId, string stopPointId)
        {
            var client = new RestClient(ApiEndpoint);
            var request = new RestRequest($"Line/{lineId}/Timetable/{stopPointId}", Method.GET);
            SetupRequest(request);
            var response = client.Execute<TimetableResponse>(request);
            return response.Data;
        }

        private static void SetupRequest(RestRequest request)
        {
            request.AddQueryParameter("app_id", AppId);
            request.AddQueryParameter("app_key", AppKey);
        }
    }
}