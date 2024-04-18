using Abp.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;
using Template.Services.FileAppService.Dto;

namespace Template.Services.FileAppService
{
    /// <summary>
    /// This class manages file operations in the server
    /// </summary>
    public interface IFileAppService:IApplicationService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<File> CreateFile([FromForm]FileDto input);
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<string> GetFile(Guid id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Domain.Model.File> DeleteAsync(Guid id);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<Domain.Model.File> UpdateAsync(Guid id);
    }
}
