using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;
using Template.Services.BorrowerAppService.Dto;
using Template.Services.OutbookAppService.Dto;

namespace Template.Services.OutbookAppService
{
    [AbpAuthorize]
    public class OutbookAppService:ApplicationService,IOutbookAppService
    {
        private readonly IRepository<OutBook, Guid> _repository;
        private readonly IRepository<Book, Guid> _bookRepository;
        private readonly IRepository<Borrower, Guid> _borrowerRepository;

        public OutbookAppService(IRepository<OutBook,Guid> repository, IRepository<Book, Guid> bookRepository, IRepository<Borrower, Guid> borrowerRepository)
        {
            this._repository = repository;
            this._bookRepository = bookRepository;
            this._borrowerRepository = borrowerRepository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<OutbookDto> Create([FromBody] OutbookDto input)
        {
            var exist = await _repository.FirstOrDefaultAsync(x => x.BorrowerId == input.BorrowerId && x.BookId == input.BookId);
            if (exist == null)
            {
                var OutbookModel = ObjectMapper.Map<OutBook>(input);
                var person = await _borrowerRepository.FirstOrDefaultAsync(x => x.Id == input.BorrowerId);
                var book = await _bookRepository.FirstOrDefaultAsync(x => x.Id == input.BookId);

                OutbookModel.Book = book;
                OutbookModel.Borrower = person;

                await _repository.InsertAsync(OutbookModel);
                return ObjectMapper.Map<OutbookDto>(OutbookModel);
            }
            else
            {
                throw new UserFriendlyException("Already Requested the book.");
            }
            
            
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<List<OutBookReturnDto>> GetAll([FromQuery] string? status)
        {

            var query = _repository.GetAll().Include(x => x.Borrower).Include(x => x.Book).AsQueryable();

            if (string.IsNullOrEmpty(status) == false)
            {
                query=query.Where(x=>(int)x.Status == int.Parse(status));
            }
            return ObjectMapper.Map<List<OutBookReturnDto>>(await query.ToListAsync());
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<List<OutBookReturnDto>> GetAllUser()
        {

            var list = await _repository.GetAll().Include(x => x.Borrower).Include(x => x.Borrower.User).Include(x => x.Book).Where(x => x.Borrower.User.Id == AbpSession.UserId).ToListAsync();
            return ObjectMapper.Map<List<OutBookReturnDto>>(list);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<OutbookDto> Update([FromBody] OutbookUpdateDto input)
        {
            var bookRequest= await _repository.FirstOrDefaultAsync(x=>x.Id==input.Id);
            bookRequest.Status=input.status;
            var updt = await _repository.UpdateAsync(bookRequest);
            return ObjectMapper.Map<OutbookDto>(updt);
        }
    }
}


