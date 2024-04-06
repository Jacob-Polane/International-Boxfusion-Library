using RecommendationAPI;

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddHostedService<Worker>();
builder.Services.AddHttpClient("Recommendation", client =>
{
    client.BaseAddress = new Uri("https://www.googleapis.com/books/v1/");
});

builder.Services.AddHttpClient("Create Book", client => { client.BaseAddress = new Uri("https://localhost:44311/api/services/app/Book/"); });
builder.Services.AddHostedService<Worker>();
var host = builder.Build();

host.Run();
