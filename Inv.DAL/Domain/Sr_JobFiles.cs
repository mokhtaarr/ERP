//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sr_JobFiles
    {
        public int FileId { get; set; }
        public Nullable<int> JorderId { get; set; }
        public string FileName { get; set; }
        public string FileDesc { get; set; }
        public byte[] Image { get; set; }
        public byte[] binary { get; set; }
    }
}
