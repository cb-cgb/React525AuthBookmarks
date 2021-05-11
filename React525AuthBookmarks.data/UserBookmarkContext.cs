using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace React525AuthBookmarks.data
{
    public class UserBookmarkContext : DbContext
    {
        private string _conn;

        public UserBookmarkContext(string connection)
        {
            _conn = connection;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_conn);
        }

        public DbSet<User> Users {get; set;}
        public DbSet<Bookmark> Bookmarks { get; set; }
    }
}
