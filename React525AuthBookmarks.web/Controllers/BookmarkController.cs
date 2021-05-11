using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using React525AuthBookmarks.data;

namespace React525AuthBookmarks.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookmarkController : ControllerBase
    {
        private string _conn;

        public BookmarkController(IConfiguration configuration) 
        {
            _conn = configuration.GetConnectionString("ConStr");

        }

        [HttpGet]
        [Route("toplinks")]

        public List<TopBookmark> GetTopLinks()
        {
            var db = new UserBookmarksRepository(_conn);
            return db.GetTopBookmarks();
        }

        [HttpGet]
        [Route("getlinks")]
        public List<Bookmark> Get()
        {
            var user = GetCurrentUser();
            var db = new UserBookmarksRepository(_conn);
            return db.GetBookmarks(user.UserId);
        }

      
        private User GetCurrentUser()
        {
            var db = new UserBookmarksRepository(_conn);
            return db.GetUserByEmail(User.Identity.Name);
        }

        [HttpPost]
        [Route("addbookmark")]
        public void Add(Bookmark b)
        {
            var db = new UserBookmarksRepository(_conn);
            db.AddBookmark(b);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Bookmark b)
        {
            var db = new UserBookmarksRepository(_conn);
            db.Update(b);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Bookmark b)
        {
            var db = new UserBookmarksRepository(_conn);
            db.Delete(b.Id);
        }




    }
}
