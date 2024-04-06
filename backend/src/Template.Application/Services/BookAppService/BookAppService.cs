using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;
using Template.Services.BookAppService.Dto;

namespace Template.Services.BookAppService
{
    
    public class BookAppService : AsyncCrudAppService<Book, BookDto, Guid>, IBookAppService
    {
        private readonly IRepository<Book,Guid> _repository;
        private readonly IRepository<Borrower,Guid> _personRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        public BookAppService(IRepository<Book, Guid> repository,IRepository<Borrower,Guid> personRepository) : base(repository) { 
        
            this._repository=repository;
            this._personRepository = personRepository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="isbn"></param>
        /// <param name="author"></param>
        /// <param name="Category"></param>
        /// <param name="title"></param>
        /// <returns></returns>
        ///
        [AbpAuthorize]
        [HttpGet]
        //...Book?/search?author=...&isbn=...
        public async Task<List<BookDto>> search([FromQuery] string? isbn, [FromQuery] string? author, [FromQuery] string? Category, [FromQuery] string? title)
        {
            var query = this._repository.GetAllIncluding(x=>x.Comments).AsQueryable();


            //filtering using isbn
            if (string.IsNullOrEmpty(isbn) == false )
            {
                if (isbn.Length == 10)
                {
                    query = query.Where(x => x.Isbn10 == isbn);
                }else if (isbn.Length == 13)
                {
                    query = query.Where(x => x.Isbn13 == isbn);
                }
            }
            

            //filtering by author 

            if (string.IsNullOrEmpty(author) == false)
            {
                query = query.Where(x => x.Author.Contains(author));
            }

            //filtering by category
            if (string.IsNullOrEmpty(Category) == false)
            {
                query = query.Where(x => x.Category.Contains(Category));
            }

            //filtering by title
            if (string.IsNullOrEmpty(title) == false)
            {
                query = query.Where(x => x.Title.Contains(title));
            }

            return ObjectMapper.Map<List<BookDto>>(await query.ToListAsync());
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<BookDto> GetByGoogleIdAsync(string id)
        {
            var query = await this._repository.FirstOrDefaultAsync(x => x.uniqueId== id);
            return ObjectMapper.Map<BookDto>(query);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<List<BookDto>> GetTop10()
        {
            var query = _repository.GetAll().OrderByDescending(x=>x.Frequency).Take(10);
            return ObjectMapper.Map<List<BookDto>>(query);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<List<BookDto>> GetRecommendation()
        {
            var person = await _personRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId);
            var query = await _repository.GetAll().Where(x => person.InterestCategory.Contains(x.Category)).Take(15).ToListAsync();
            return ObjectMapper.Map<List<BookDto>>(query);
        }
    }
}
