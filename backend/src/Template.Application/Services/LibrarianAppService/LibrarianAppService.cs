using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Authorization.Users;
using Template.Domain.Model;
using Template.Services.LibrarianAppService.Dto;

namespace Template.Services.LibrarianAppService
{
    public class LibrarianAppService:ApplicationService
    {
        private readonly IRepository<Librarian, Guid> _LibrarianRepository;
        private readonly UserManager _userManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="userManager"></param>
        public LibrarianAppService(IRepository<Librarian, Guid> repository, UserManager userManager)
        {
            this._LibrarianRepository = repository;
            this._userManager = userManager;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<LibrarianDto> GetIdOfCurrentUser()
        {
            return ObjectMapper.Map<LibrarianDto>(await _LibrarianRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>

        [HttpPost]
        public async Task<LibrarianDto> CreateAsync(LibrarianDto input)
        {
            var Librarian = ObjectMapper.Map<Librarian>(input);
            Librarian.User = await CreateUser(input);
            return ObjectMapper.Map<LibrarianDto>(await _LibrarianRepository.InsertAsync(Librarian));
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [AbpAuthorize]
        [HttpDelete]
        public async Task Delete(Guid id)
        {
            await _LibrarianRepository.DeleteAsync(id);
        }

        [AbpAuthorize]
        [HttpGet]
        public async Task<List<LibrarianDto>> GetAllAsync()
        {
            var query = _LibrarianRepository.GetAllIncluding(m => m.User).ToList();
            return ObjectMapper.Map<List<LibrarianDto>>(query);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// 
        /// 
        [AbpAuthorize]
        [HttpGet]
        public async Task<LibrarianDto> GetAsync(Guid id)
        {
            var query = await _LibrarianRepository.GetAllIncluding(m => m.User).FirstOrDefaultAsync(x => x.Id == id);
            return ObjectMapper.Map<LibrarianDto>(query);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize]
        [HttpPut]
        public async Task<LibrarianDto> UpdateAsync(LibrarianDto input)
        {
            var Librarian = await _LibrarianRepository.GetAsync(input.Id);
            var updt = await _LibrarianRepository.UpdateAsync(ObjectMapper.Map(input, Librarian));
            return ObjectMapper.Map<LibrarianDto>(updt);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>

        public async Task<User> CreateUser(LibrarianDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            ObjectMapper.Map(input, user);

            //check if properties email and username not null or empty 
            if (!string.IsNullOrEmpty(user.NormalizedUserName) && !string.IsNullOrEmpty(user.NormalizedEmailAddress))
            {
                user.SetNormalizedNames();
            }

            CheckErrors(await _userManager.CreateAsync(user, input.Password));
            CurrentUnitOfWork.SaveChanges();
            return user;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="result"></param>
        protected virtual void CheckErrors(IdentityResult result) => result.CheckErrors(LocalizationManager);
    }
}
