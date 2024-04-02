using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Services.CommentAppService.Dto;

namespace Template.Services.CommentAppService
{
    public interface ICommentAppService: IApplicationService
    {
        public Task<CommentDto> CreateAsync(Guid id,CommentDto comment);
        public Task<List<CommentDto>> GetAll(Guid id);
    }
}
