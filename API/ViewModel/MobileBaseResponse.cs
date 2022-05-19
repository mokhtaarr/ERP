using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Inv.API.ViewModel
{
    public class MobileBaseResponse
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public static string SuccessMessage { get; set; }
        public int StatusCode { get; set; }
        public object data { get; set; }

        public MobileBaseResponse(object _Response = null)
        {
            SucessResponse(_Response);
        }

        public MobileBaseResponse(HttpStatusCode _StatusCode, string _ErrorMessage)
        {
            ErrorResponse(_StatusCode, _ErrorMessage);
        }

        private void SucessResponse(object _Response)
        {
            this.IsSuccess = true;
            this.data = _Response;
            this.StatusCode = Convert.ToInt32(HttpStatusCode.OK);
        }

        private void ErrorResponse(HttpStatusCode _StatusCode, string _ErrorMessage)
        {
            this.IsSuccess = false;
            this.StatusCode = Convert.ToInt32(_StatusCode);
            this.ErrorMessage = _ErrorMessage;
        }
    }
}
