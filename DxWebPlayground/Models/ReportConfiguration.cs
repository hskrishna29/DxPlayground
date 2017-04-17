using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DxWebPlayground.Models
{
    public class ReportConfiguration
    {
        public int ReportColumnId { get; set; }
        public int ReportSourceId { get; set; }
        public string DisplayName { get; set; }
        public string DbColumnName { get; set; }
        public int ReportColumnTypeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string SourceTable;

        public List<int> Fields { get; set; }
        public List<int> GroupBy { get; set; }
        public List<int> Segments { get; set; }
    }
}