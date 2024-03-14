FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/Template.Web.Host/Template.Web.Host.csproj", "src/Template.Web.Host/"]
COPY ["src/Template.Web.Core/Template.Web.Core.csproj", "src/Template.Web.Core/"]
COPY ["src/Template.Application/Template.Application.csproj", "src/Template.Application/"]
COPY ["src/Template.Core/Template.Core.csproj", "src/Template.Core/"]
COPY ["src/Template.EntityFrameworkCore/Template.EntityFrameworkCore.csproj", "src/Template.EntityFrameworkCore/"]
WORKDIR "/src/src/Template.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/Template.Web.Host", "src/Template.Web.Host"]
COPY ["src/Template.Web.Core", "src/Template.Web.Core"]
COPY ["src/Template.Application", "src/Template.Application"]
COPY ["src/Template.Core", "src/Template.Core"]
COPY ["src/Template.EntityFrameworkCore", "src/Template.EntityFrameworkCore"]
WORKDIR "/src/src/Template.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "Template.Web.Host.dll"]
