using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace React525AuthBookmarks.data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public String Url { get; set; }
        public String Title { get; set; }       
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
