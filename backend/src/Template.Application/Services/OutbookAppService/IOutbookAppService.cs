using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Services.OutbookAppService.Dto;

namespace Template.Services.OutbookAppService
{
    /// <summary>
    /// 
    /// </summary>
    public interface IOutbookAppService:IApplicationService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<OutbookDto> Create([FromBody] OutbookDto input);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        Task<List<OutBookReturnDto>> GetAll([FromQuery] string? status);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<OutbookDto> Update([FromBody] OutbookUpdateDto input);
    }
}
