using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
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
using Template.Services.FileAppService;
using Template.Services.FileAppService.Dto;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Template.Services.BookAppService
{
    
    public class BookAppService : AsyncCrudAppService<Book, BookDto, Guid>, IBookAppService
    {
        private readonly IRepository<Book,Guid> _repository;
        private readonly IRepository<Borrower,Guid> _personRepository;
        private readonly IFileAppService _fileAppService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        public BookAppService(IRepository<Book, Guid> repository,IRepository<Borrower,Guid> personRepository,IFileAppService fileAppService) : base(repository) { 
        
            this._repository=repository;
            this._personRepository = personRepository;
            this._fileAppService = fileAppService;
          
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
            var query = this._repository.GetAllIncluding(x=>x.Comments,x=>x.Image).AsQueryable();


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
            List<BookDto> list= ObjectMapper.Map<List<BookDto>>(await query.ToListAsync());
            
            
            
            foreach(BookDto i in list)
            {
                if (i.ImageId != null)
                {
                    i.imageString = await _fileAppService.GetFile((Guid)i.ImageId);
                }
                
            }
            return list;
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
        [AbpAuthorize]
        [HttpGet]

        public async Task<List<BookDto>> GetRecommendation()
        {
            if (AbpSession.UserId!=null)
            {
                var person = await _personRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId);
                var query = await _repository.GetAll().Where(x => person.InterestCategory.Contains(x.Category)).Take(15).ToListAsync();
                return ObjectMapper.Map<List<BookDto>>(query);
            }
            else
            {
                throw new UserFriendlyException("User is not logged in");
            }
            
        }

        [AbpAuthorize]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<BookDto> createBook([FromForm] BookDto input)
        {
            try
            {
                var file = await _fileAppService.CreateFile(new FileDto { FileData=input.File } );
                var result = ObjectMapper.Map<Book>(input);
                result.Image = file;
                await _repository.InsertAsync(result);
                CurrentUnitOfWork.SaveChanges();

                return ObjectMapper.Map<BookDto>(result);

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to Create " + ex.Message);
            }
        }

        public async Task<BookDto> getBookById(Guid id)
        {
            var file = await _repository.GetAllIncluding(x=>x.Image).Where(x => x.Id == id).ToListAsync();
            var fileWithFile = ObjectMapper.Map<List<BookDto>>(file);
            fileWithFile[0].imageString = await _fileAppService.GetFile((Guid)fileWithFile[0].ImageId);

            return fileWithFile[0];
        }

        [AbpAuthorize]
        [HttpGet]
        
        public async Task<List<BookDto>> SearchBooks([FromQuery]string searchTerm)
        {
           
            var books = this._repository.GetAllIncluding(x => x.Comments, x => x.Image).AsQueryable();

            var filteredBooks =await books
                .Where(b => b.Title.Contains(searchTerm)   ||
                            b.Isbn10.Contains(searchTerm)  ||
                            b.Isbn13.Contains(searchTerm)  ||
                            b.Category.Contains(searchTerm)||
                            b.Author.Contains(searchTerm))
                .ToListAsync();

            var list= ObjectMapper.Map<List<BookDto>>(filteredBooks);
            foreach (BookDto i in list)
            {
                if (i.ImageId != null)
                {
                    i.imageString = await _fileAppService.GetFile((Guid)i.ImageId);
                }

            }
            return list;
        }
    }
}
