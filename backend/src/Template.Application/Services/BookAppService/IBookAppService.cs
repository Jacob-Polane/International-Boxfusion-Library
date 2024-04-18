using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;
using Template.Services.BookAppService.Dto;

namespace Template.Services.BookAppService
{
    public interface IBookAppService :IApplicationService
    {
        Task<List<BookDto>> search([FromQuery] string? isbn, [FromQuery] string? author,[FromQuery]string? Category, [FromQuery]string? title);
       Task<BookDto> GetByGoogleIdAsync(string id);
        Task<List<BookDto>> GetTop10();
        Task<BookDto> createBook([FromForm]BookDto input);
        Task<BookDto> getBookById(Guid id);
        
    }
}
