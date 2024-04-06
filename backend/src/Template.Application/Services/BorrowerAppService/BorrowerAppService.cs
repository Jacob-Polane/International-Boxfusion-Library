using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Localization;
using Abp.UI;
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
using Template.Services.BorrowerAppService.Dto;
using Template.Services.InterestAppService.Dto;
using Template.Users.Dto;

namespace Template.Services.BorrowerAppService
{
    /// <summary>
    /// 
    /// </summary>
    /// 
    
    public class BorrowerAppService :ApplicationService,IBorrowerAppService
    {
        private readonly IRepository<Borrower, Guid> _BorrowerRepository;
        private readonly UserManager _userManager;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="repository"></param>
        /// <param name="userManager"></param>
        public BorrowerAppService(IRepository<Borrower, Guid> repository,UserManager userManager)
        {
            this._BorrowerRepository= repository;
            this._userManager = userManager;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]

        public async Task<BorrowerDto> GetIdOfCurrentUser()
        {
            return ObjectMapper.Map<BorrowerDto>(await _BorrowerRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId)) ;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>

        [HttpPost]
        public async Task<BorrowerDto> CreateAsync(BorrowerDto input)
        {
            var borrower = ObjectMapper.Map<Borrower>(input);
            borrower.User = await CreateUser(input);
            return ObjectMapper.Map<BorrowerDto>(await _BorrowerRepository.InsertAsync(borrower));
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
            await _BorrowerRepository.DeleteAsync(id);
        }

        [AbpAuthorize]
        [HttpGet]
        public async Task<List<BorrowerDto>> GetAllAsync()
        {
            var query = _BorrowerRepository.GetAllIncluding(m => m.User).ToList();
            return ObjectMapper.Map<List<BorrowerDto>>(query);
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
        public async Task<BorrowerDto> GetAsync(Guid id)
        {
            var query =await _BorrowerRepository.GetAllIncluding(m => m.User).FirstOrDefaultAsync(x => x.Id == id);
            return ObjectMapper.Map<BorrowerDto>(query);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize]
        [HttpPut]
        public async Task<BorrowerDto> UpdateAsync(BorrowerDto input)
        {
            var borrower =await _BorrowerRepository.GetAsync(input.Id);
            var updt = await _BorrowerRepository.UpdateAsync(ObjectMapper.Map(input, borrower));
            return ObjectMapper.Map<BorrowerDto>(updt);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        
        public async Task<User> CreateUser(BorrowerDto input)
        {
            var user =ObjectMapper.Map<User>(input);
            ObjectMapper.Map(input, user);

            //check if properties email and username not null or empty 
            if(!string.IsNullOrEmpty(user.NormalizedUserName) && !string.IsNullOrEmpty(user.NormalizedEmailAddress))
            {
                user.SetNormalizedNames();
            }

            CheckErrors(await _userManager.CreateAsync(user,input.Password));
            CurrentUnitOfWork.SaveChanges();
            return user;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="result"></param>
        protected virtual void CheckErrors(IdentityResult result) => result.CheckErrors(LocalizationManager);

        public async Task<InterestDto> CreateInterest(InterestDto input)
        {
            var borrower = await _BorrowerRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId);
            foreach(var itr in input.InterestCategory)
            {
                if (borrower.InterestCategory.Contains(itr))
                {
                    
                }
                else
                {
                    borrower.InterestCategory.Add(itr);
                }
            }
            
           

            return ObjectMapper.Map<InterestDto>(borrower);
            
        }

        public async Task<InterestDto> GetInterests()
        {
            
            var borrower = await _BorrowerRepository.FirstOrDefaultAsync(x => x.User.Id == AbpSession.UserId);

            return ObjectMapper.Map<InterestDto>(borrower);
        }
    }
}
