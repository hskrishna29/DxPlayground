using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DxWebPlayground.CustomException
{
    public class ValidationException : ApplicationException
    {
        public JsonResult ExceptionDetails;
        public ValidationException(JsonResult exceptionDetails)
        {
            this.ExceptionDetails = exceptionDetails;
        }
        public ValidationException(string message) : base(message) { }
        public ValidationException(string message, Exception inner) : base(message, inner) { }
        protected ValidationException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context)
            : base(info, context) { }
    }
}