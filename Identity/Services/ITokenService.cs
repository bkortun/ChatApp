using Identity.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services
{
	public interface ITokenService
	{
		public Task<Token> GenerateTokenAsync(GenerateTokenRequest generateTokenRequest);
	}
}
