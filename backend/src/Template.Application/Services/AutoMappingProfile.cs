using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Template.Authorization.Users;
using Template.Domain.Model;
using Template.Services.BookAppService.Dto;
using Template.Services.BorrowerAppService.Dto;
using Template.Services.CommentAppService.Dto;
using Template.Services.FileAppService.Dto;
using Template.Services.LibrarianAppService.Dto;
using Template.Services.OutbookAppService.Dto;

namespace Template.Services
{
    public class AutoMappingProfile :Profile
    {
        public AutoMappingProfile()
        {
            //Book
            CreateMap<BookDto, Book>().ReverseMap();
            
            //Comment
            CreateMap<Comment, CommentDto>().ReverseMap();
            
            //Borrower
            CreateMap<Borrower, BorrowerDto>().ReverseMap();

            CreateMap<BorrowerDto, User>()
                .ForMember(d => d.Name, s => s.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, s => s.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, s => s.MapFrom(s => s.Username))
                .ForMember(d => d.FullName, s => s.MapFrom(s => s.Name + " " + s.Surname))
                .ForMember(d => d.Password, s => s.MapFrom(s => s.Password))
                .ForMember(d => d.EmailAddress, s => s.MapFrom(s => s.Email))
                .ForMember(d => d.Id, i => i.Ignore())
                .ReverseMap();

            
            CreateMap<Borrower, BorrowerDto>()
                .ForMember(d => d.userId, s => s.MapFrom(s => s.User != null ? s.User.Id : (long?)null));


            //Outbook
            CreateMap<OutbookDto, OutBook>()
                .ForMember(d=>d.BookId,s=>s.MapFrom(s=>s.BookId))
                .ForMember(d=>d.BorrowerId,s=>s.MapFrom(s=>s.BorrowerId)).ReverseMap();
                ;
            //Librarian

            CreateMap<Librarian, LibrarianDto>().ReverseMap();

            CreateMap<LibrarianDto, User>()
                .ForMember(d => d.Name, s => s.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, s => s.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, s => s.MapFrom(s => s.Username))
                .ForMember(d => d.FullName, s => s.MapFrom(s => s.Name + " " + s.Surname))
                .ForMember(d => d.Password, s => s.MapFrom(s => s.Password))
                .ForMember(d => d.EmailAddress, s => s.MapFrom(s => s.Email))
                .ForMember(d => d.Id, i => i.Ignore())
                .ReverseMap();

            CreateMap<Librarian, LibrarianDto>()
                .ForMember(d => d.userId, s => s.MapFrom(s => s.User != null ? s.User.Id : (long?)null));

            /*CreateMap<FileDto, Domain.Model.File>()
                .ForMember(x => x.Id, v => v.Ignore())
                .ForMember(x => x.Filename, v => v.MapFrom(v => v.FileData.FileName))
                .ForMember(x => x.FileExtention, v => v.MapFrom(v => Path.GetExtension(v.FileData.FileName)))
                .ForMember(x => x.FileData, v => v.MapFrom(v => v.FileData))
                .ForMember(x => x.FilePath, v => v.MapFrom(v => v.Filename));*/
        }

    }
}
