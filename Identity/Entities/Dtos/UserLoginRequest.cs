using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Entities.Dtos
{
    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Persistent { get; set; }
        public bool Lock { get; set; }
    }
}
