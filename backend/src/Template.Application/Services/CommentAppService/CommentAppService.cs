using Abp.Application.Services;
using Abp.Application.Services.Dto;
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
using Template.Services.CommentAppService.Dto;



namespace Template.Services.CommentAppService
{
    /// <summary>
    /// 
    /// </summary>
    [AbpAuthorize]
    public class CommentAppService : ApplicationService, ICommentAppService
    {
        //private readonly IRepository<Comment, Guid> _repository;
        private readonly IRepository<Book, Guid> _bookRepository;
        private readonly IRepository<Comment, Guid> repository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="bookRepository"></param>
        public CommentAppService(IRepository<Book, Guid> bookRepository,IRepository<Comment,Guid> repository)
        {
            //this._repository = repository;
            this._bookRepository = bookRepository;
            this.repository = repository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="comment"></param>
        /// <returns></returns>

        [Route("api/services/app/Comment/Create/{id}")]
        public async Task<CommentDto> CreateAsync([FromRoute] Guid id, [FromBody] CommentDto comment)
        {
            var commentModel = ObjectMapper.Map<Comment>(comment);
            var book = await _bookRepository.GetAsync(id);

            if (book == null)
            {
                return null;
            }

            book.Comments.Add(commentModel);
            return ObjectMapper.Map<CommentDto>(commentModel);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        
        [Route("api/services/app/Comment/GetAll/{id}")]
        public async Task<List<CommentDto>> GetAll(Guid id)
        {
            var comments = await repository.GetAllIncluding().Where(x => x.Book.Id == id).ToListAsync();
            return ObjectMapper.Map<List<CommentDto>>(comments);

        }
    }
}


