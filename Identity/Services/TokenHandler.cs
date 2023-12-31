﻿using Identity.Entities.Dtos;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
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

		public Task<Token> GenerateTokenAsync(GenerateTokenRequest generateTokenRequest)
		{
			SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["IdentitySettings:SecretKey"]));

			var dateTimeNow = DateTime.UtcNow;
			Console.WriteLine(dateTimeNow);

			var claims = new List<Claim>
				{
					new Claim("username", generateTokenRequest.UserName),
					new Claim("email", generateTokenRequest.Email),
					new Claim("id",generateTokenRequest.Id)
				};

			foreach (var role in generateTokenRequest.Roles)
			{
				claims.Add(new Claim("roles", role));
			}


			JwtSecurityToken jwt = new(
				issuer: _configuration["IdentitySettings:Issuer"],
				audience: _configuration["IdentitySettings:Audience"],
				claims: claims,
				notBefore: dateTimeNow,
				expires: dateTimeNow.Add(TimeSpan.FromMinutes(60)),
				signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256)) ;

			return Task.FromResult(
				new Token()
				{
					AccessToken = new JwtSecurityTokenHandler().WriteToken(jwt),
					RefreshToken= GenerateRefreshToken(),
					Expiration = dateTimeNow.Add(TimeSpan.FromMinutes(60))
				});
		}

		private string GenerateRefreshToken()
		{
			byte[] bytes=new byte[32];
			using (RandomNumberGenerator random=RandomNumberGenerator.Create())
			{
				random.GetBytes(bytes);
				return Convert.ToBase64String(bytes);
			}
		}
	}
}
