using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public string? uniqueId { get; set; }
        public  DateTime? PublishedDate { get; set; }
        public  int Frequency { get; set; }
        public  string Category { get; set; }
        public  int Number_Avaliable { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }

        public Guid? ImageId { get; set; }

        public string? imageString { get; set; }

        [NotMapped]
        public IFormFile? File { get; set; }
    }
}
