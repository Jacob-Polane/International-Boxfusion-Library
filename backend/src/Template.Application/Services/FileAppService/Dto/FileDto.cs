using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;

namespace Template.Services.FileAppService.Dto
{
    /*[AutoMapFrom(typeof(File))]*/
    public class FileDto: EntityDto<Guid>
    {
        [Required]
        public IFormFile? FileData { get; set; }
    }
}
