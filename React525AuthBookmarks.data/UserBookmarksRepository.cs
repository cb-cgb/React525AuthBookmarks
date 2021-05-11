using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace React525AuthBookmarks.data
{
    public class UserBookmarksRepository
    {
        private string _conn;

        public UserBookmarksRepository(string connection)
        {
            _conn = connection;
        }


        public void AddUser(User u)
        {
            using (var context = new UserBookmarkContext(_conn))
            {

                //add only if userName doesn't already exist
                var user = GetUserByEmail(u.Email);

                if (user is null)
                {
                    u.PasswordHash = BCrypt.Net.BCrypt.HashPassword(u.PasswordHash);//encrypts the password value passed in
                    context.Users.Add(u);
                    context.SaveChanges();
                }
            }
        }

        public User GetUserByEmail(string email)
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                return context.Users.FirstOrDefault(u => u.Email == email);
            }
        }

        public User Login(User u)
        {
            var user = GetUserByEmail(u.Email);

            if (user is null)
            {
                return null;
            }

            var isValidPass = BCrypt.Net.BCrypt.Verify(u.PasswordHash, user.PasswordHash);

            if (!isValidPass)
            {
                return null;
            }

            return user;
        }

        
        public List<Bookmark> GetBookmarks(int userId)
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                return context.Bookmarks.Include(b => b.User).Where(b => b.UserId == userId).ToList();
            }
        }

        public void AddBookmark(Bookmark b)
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                context.Bookmarks.Add(b);
                context.SaveChanges();
            }
        }

        public void Update(Bookmark b)
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                context.Bookmarks.Update(b);
                context.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                var bmToDelete = context.Bookmarks.FirstOrDefault(b => b.Id == id);
                context.Bookmarks.Remove(bmToDelete);
                context.SaveChanges();
            }
        }

        public List<TopBookmark> GetTopBookmarks()
        {
            using (var context = new UserBookmarkContext(_conn))
            {
                var toplinks = context.Bookmarks.GroupBy(b => b.Url).OrderByDescending(b => b.Count()).Take(5).Select
                (b => new TopBookmark
                {
                    Url = b.Key,
                    Count = b.Count()
                }
                ).ToList();

                return toplinks;
            }
        }
    }
}
   
