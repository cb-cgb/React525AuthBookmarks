using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace React525AuthBookmarks.data
{
    public class UserBookmarkContextFactory : IDesignTimeDbContextFactory<UserBookmarkContext>
    {
        public UserBookmarkContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}React525AuthBookmarks.web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new UserBookmarkContext(config.GetConnectionString("ConStr"));
        }
    
    }
}
