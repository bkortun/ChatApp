using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Entities.Dtos
{
    public class TokenResponse
    {
        public string AuthToken { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime AccessTokenExpireDate { get; set; }
        public DateTime? RefreshTokenExpireDate { get; set; }
    }
}
