using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecommendationAPI
{
    public class Book
    {
        public readonly string Title;
        public readonly string Author;
        public readonly string Description;
        public readonly string Category;
        public readonly string ImageUrl;
        public readonly string PublishedDate;
        public string isbn10;
        public string isbn13;
        public string uniqueId;
        public int number_Available;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="title"></param>
        /// <param name="author"></param>
        /// <param name="desc"></param>
        /// <param name="category"></param>
        /// <param name="url"></param>
        /// <param name="publisher"></param>
        /// <param name="date"></param>
        
        public Book(string title,string [] author,string desc,string [] category,string url,string date,isbnConfig [] isbn,string id)
        {
            this.Title = title;
            this.Author = this.ArrayToCommaSeparated(author);
            this.Description = desc;
            this.Category = this.ArrayToCommaSeparated(category);
            this.PublishedDate = date;
            this.ImageUrl = url; 
            this.uniqueId=id;
            this.setIsbn(isbn);
            this.number_Available = 10;

        }

        public string toString()
        {
            return $"""
                Title:{this.Title}

                Author:{this.Author}

                Description:{this.Description}


                Category:{this.Category}

                Publisher date:{this.PublishedDate}

                Image url: {this.ImageUrl}

                Id:{this.uniqueId}
                """;
        }

        public string ArrayToCommaSeparated(string[] arr)
        {
            string authors = "";
            for (int i = 0; i < arr.Length - 1; i++)
            {
                authors += arr[i] + ",";
            }
            authors += arr[arr.Length - 1];
            return authors;
        }

        public void setIsbn(isbnConfig[] array)
        {
            foreach(isbnConfig item in array)
            {
                if (item.type == "ISBN_10")
                {
                    this.isbn10 =  item.identifier;
                }else if(item.type=="ISBN_13")
                {
                    this.isbn13 = item.identifier;
                }
            }
        }
    }
}
