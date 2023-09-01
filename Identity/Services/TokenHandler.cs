using Identity.Entities.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services
{
	public class TokenHandler : ITokenService
	{
		readonly IConfiguration _configuration;

		public TokenHandler(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public Task<AccessToken> GenerateTokenAsync(GenerateTokenRequest generateTokenRequest)
		{
			SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["IdentitySettings:SecretKey"]));

			var dateTimeNow = DateTime.UtcNow;

			JwtSecurityToken jwt = new(
				issuer: _configuration["IdentitySettings:Issuer"],
				audience: _configuration["IdentitySettings:Audience"],
				claims: new List<Claim> 
				{
					new Claim("username", generateTokenRequest.UserName),
					new Claim("email", generateTokenRequest.Email),
					new Claim("role", generateTokenRequest.Role.First()),
					new Claim("id",generateTokenRequest.Id)
				},
				notBefore: dateTimeNow,
				expires: dateTimeNow.Add(TimeSpan.FromMinutes(10)),
				signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256)) ;

			return Task.FromResult(
				new AccessToken()
				{
					Token = new JwtSecurityTokenHandler().WriteToken(jwt),
					Expiration = dateTimeNow.Add(TimeSpan.FromMinutes(10))
				});
		}
	}
}
