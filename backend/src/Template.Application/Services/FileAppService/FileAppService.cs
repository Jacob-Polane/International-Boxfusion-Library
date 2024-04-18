using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper.Internal.Mappers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Domain.Model;
using Template.Services.FileAppService.Dto;

namespace Template.Services.FileAppService
{
    /// <summary>
    /// Implementation of file operations in the server
    /// CRUD operar=tions 
    /// </summary>
    public class FileAppService:ApplicationService, IFileAppService
    {
        private readonly IRepository<Domain.Model.File, Guid> _repository;
        private readonly string BaseUri = "App_Data/Images";
        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        public FileAppService(IRepository<Domain.Model.File,Guid> repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        [AbpAuthorize]
        [HttpPost]
        [Consumes("multipart/form-data")]

        public async Task<Domain.Model.File> CreateFile([FromForm]FileDto input)
        {
            ValidateFileUpload(input);
           //check existence
           if(await _repository.FirstOrDefaultAsync(x => x.Filename == input.FileData.FileName) == null)
            {

                var File = new Domain.Model.File { 
                    FileData=input.FileData,
                    FileExtention = Path.GetExtension(input.FileData.FileName),
                    FileLength = input.FileData.Length,
                    Filename = input.FileData.FileName,
                    FilePath=$"{Directory.GetCurrentDirectory()}/{BaseUri}/{input.FileData.FileName}"
                };

                using (var fileStream = input.FileData.OpenReadStream())
                {
                    await SaveFile(File.FilePath, fileStream);
                }


                return await _repository.InsertAsync(File);

            }
            else
            {
                throw new UserFriendlyException("Image name already exists");
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        [AbpAuthorize]
        public async Task<string> GetFile(Guid id)
        {
            var File = await _repository.FirstOrDefaultAsync(x => x.Id == id);
            
            if (File == null)
                //return Content("filename not present");
                throw new UserFriendlyException("File not found");

            byte[] inArray = System.IO.File.ReadAllBytes(File.FilePath);
            return Convert.ToBase64String(inArray);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AbpAuthorize]
        [HttpDelete]
        public async Task<Domain.Model.File> DeleteAsync(Guid id)
        {
            //check if file id exists
            var file = await _repository.FirstOrDefaultAsync(x => x.Id == id);
            if (file == null)
            {
                throw new UserFriendlyException("Image doesn't exist");
            }
            else
            {
                 await _repository.DeleteAsync(file);
                 
                // remove from server
                
                return  file;
            }
            
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        [AbpAuthorize]
        [HttpPut]
        
        public async Task<Domain.Model.File> UpdateAsync(Guid id)
        {
            var file = await _repository.FirstOrDefaultAsync(x => x.Id == id);
            if (file != null)
            {
                //change the path of the image

                //delete physical image

               return await _repository.UpdateAsync(file);
            }
            else
            {
                throw new UserFriendlyException("Image doesn't exist");
            }

        }
        
        
        
        
        //helper functions


        /// <summary>
        /// /
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="UserFriendlyException"></exception>
        private void ValidateFileUpload(FileDto request)
        {
            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png" };

            if (!allowedExtensions.Contains(System.IO.Path.GetExtension(request.FileData.FileName)))
            {
                throw new UserFriendlyException("File extension is not supported!");
            }

            if(request.FileData.Length>=10485760) { throw new UserFriendlyException("Please upload image with file size less than 10MB"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filePath"></param>
        /// <param name="stream"></param>
        /// <returns></returns>
        /// <exception cref="UserFriendlyException"></exception>
        private async Task SaveFile(string filePath, Stream stream)
        {
            try
            {
                using (var fs = new FileStream(filePath, FileMode.Create))
                {
                    await stream.CopyToAsync(fs);
                }
            } catch {
                throw new UserFriendlyException($"Failed to save file: {filePath}");
            }
        }
    }
}
