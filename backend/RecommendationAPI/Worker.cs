using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Text;

namespace RecommendationAPI
{
        public class isbnConfig
        {
            public string type { get; set; }
            public string identifier { get; set; }
            public isbnConfig(string type="",string identifier="")
            { 
                this.type = type;
                this.identifier = identifier;
            }

            
        }
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        
        public Worker(ILogger<Worker> logger,IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;

        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            /*while (!stoppingToken.IsCancellationRequested)
            {*/
                if (_logger.IsEnabled(LogLevel.Information))
                {
                    _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                }
                try
                {
                    await RecommendationAsync(stoppingToken);
                }catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
                
            /*}*/
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="stoppingToken"></param>
        /// <returns></returns>
        protected async Task RecommendationAsync(CancellationToken stoppingToken)
        {
            var client = _httpClientFactory.CreateClient("Recommendation") ;
            List<Book> books = new List<Book>();

            HttpRequestMessage[] response = new HttpRequestMessage[5];
            string[] category = ["Romance","Comedy","Arts","Drama","Science","History"];


            

            foreach (var cat in category) {
                var res = await client.GetAsync($"volumes?q={cat}", stoppingToken);
                string data = await res.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<dynamic>(data);
                foreach (var item in result.items)
                {
                    if (item.volumeInfo.industryIdentifiers == null|| item.volumeInfo.authors==null|| item.volumeInfo.description==null||item.volumeInfo.categories==null)
                    {
                        continue;
                    }
                    string title = item.volumeInfo.title;
                    string[] author = item.volumeInfo.authors.ToObject<string[]>();
                    string description = item.volumeInfo.description != null ? item.volumeInfo.description : "";
                    if (item.volumeInfo.categories == null) { continue; }
                    string[] categories = item.volumeInfo.categories.ToObject<string[]>() != null ? item.volumeInfo.categories.ToObject<string[]>() : null;
                    string imageUrl = item.volumeInfo.imageLinks.thumbnail != null ? item.volumeInfo.imageLinks.thumbnail : "";
                    string publishedDate = item.volumeInfo.publishedDate;
                   
                    string type0 = item.volumeInfo.industryIdentifiers[0].type != null ? item.volumeInfo.industryIdentifiers[0].type: "";
                    string identifier0 = item.volumeInfo.industryIdentifiers[0].identifier != null ? item.volumeInfo.industryIdentifiers[0].identifier : ""; 
                    string type1 = item.volumeInfo.industryIdentifiers[1].type != null ? item.volumeInfo.industryIdentifiers[1].type : "";
                    string identifier1 = item.volumeInfo.industryIdentifiers[1].identifier != null ? item.volumeInfo.industryIdentifiers[1].identifier : "";
                    string id = item.id;

                    if (description == "" || imageUrl == "" || categories == null)
                    {
                        continue;
                    }
                    books.Add(new Book(title, author,
                                        description, categories,
                                        imageUrl, publishedDate,
                                        new isbnConfig[]{
                                        new isbnConfig(type0,identifier0),
                                        new isbnConfig(type1,identifier1)
                                            }, id
                                        ));

                }

            }



            //Upload Books into data base
            await Upload(books, stoppingToken);
            

        }

        public async Task Upload(List<Book> books, CancellationToken stoppingToken) {
            var clientApi = _httpClientFactory.CreateClient("Create Book");
            foreach (Book item in books)
            {
                Console.WriteLine(item.toString());
                var res1 = await clientApi.GetAsync($"GetByGoogleId?id={item.uniqueId}", stoppingToken);
                string data1 = await res1.Content.ReadAsStringAsync();
                var result1 = JsonConvert.DeserializeObject<dynamic>(data1);
                if (result1.result == null)
                {
                    var json = JsonConvert.SerializeObject(item);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    var res2 = await clientApi.PostAsync("Create", content);
                    string data2 = await res2.Content.ReadAsStringAsync();
                    var result2 = JsonConvert.DeserializeObject<dynamic>(data2);
                }
                else
                {
                    continue;
                }
            }
        }
    }
}
