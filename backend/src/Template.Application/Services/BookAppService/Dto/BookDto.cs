using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;

namespace Template.Services.BookAppService.Dto
{
    [AutoMap(typeof(Book))]
    public class BookDto : EntityDto<Guid>
    {
        public  string Title { get; set; }
        public  string Author { get; set; }
        public  string? Isbn10 { get; set; }
        public  string? Isbn13 { get; set; }
        public  string? Publisher { get; set; }
        public  DateTime? PublishedDate { get; set; }
        public  int Frequency { get; set; }
        public  string Category { get; set; }
        public  int Number_Avaliable { get; set; }
    }
}
