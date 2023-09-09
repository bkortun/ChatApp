using Identity.Entities;
using Identity.Entities.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services
{
	public class AuthService : IAuthService
	{
		private readonly UserManager<User> _userManager;
		private readonly SignInManager<User> _signInManager;
		private readonly RoleManager<Role> _roleManager;
		private readonly ITokenService _tokenService;

		public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, RoleManager<Role> roleManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_tokenService = tokenService;
			_roleManager = roleManager;
		}

		public async Task<TokenResponse> AssaignRoleToUserAsync(string roleName, string userId)
		{
			var user = await _userManager.FindByIdAsync(userId);
			await _userManager.AddToRoleAsync(user, roleName);
			var roles = await _userManager.GetRolesAsync(user);
			var token = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
			{
				UserName = user.UserName,
				Email = user.Email,
				Roles = roles,
				Id = user.Id
			});
			return new TokenResponse
			{
				AuthToken = token.AccessToken,
				AccessTokenExpireDate = token.Expiration
			};
		}

		public async Task CreateRoleAsync(string roleName)
		{
			var isExist = await _roleManager.RoleExistsAsync(roleName);
			if (!isExist)
			{
				Role role = new(roleName);
				await _roleManager.CreateAsync(role);
			}
		}

		public async Task DeleteRoleAsync(string roleName)
		{
			var isExist = await _roleManager.RoleExistsAsync(roleName);
			if (isExist)
			{
				var role = await _roleManager.FindByNameAsync(roleName);
				var a = await _roleManager.DeleteAsync(role);
			}
		}

		public async Task<TokenResponse> RefreshLoginAsync(string refreshToken, string email)
		{
			User user = await _userManager.FindByEmailAsync(email);
			if (user != null && user?.RefreshTokenEndDate > DateTime.UtcNow)
			{
				var roles = await _userManager.GetRolesAsync(user);
				var token = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
				{
					UserName = user.UserName,
					Email = user.Email,
					Roles = roles,
					Id = user.Id
				});
				var tokenResponse = new TokenResponse()
				{
					RefreshToken = token.RefreshToken,
					RefreshTokenExpireDate = token.Expiration.AddMinutes(10),
					AuthToken = token.AccessToken,
					AccessTokenExpireDate = token.Expiration
				};

				user.RefreshToken = token.RefreshToken;
				user.RefreshTokenEndDate = token.Expiration.AddMinutes(10);
				await _userManager.UpdateAsync(user);

				return tokenResponse;
			}
			return null;
		}

		public async Task RemoveRoleToUserAsync(string roleName, string userId)
		{
			var user = await _userManager.FindByIdAsync(userId);
			await _userManager.RemoveFromRoleAsync(user, roleName);
			var roles = await _userManager.GetRolesAsync(user);

		}

		public async Task<TokenResponse> UserLoginAsync(UserLoginRequest userLoginRequest)
		{
			var findedUser = await _userManager.FindByEmailAsync(userLoginRequest.Email);
			if (findedUser != null)
			{
				await _signInManager.SignOutAsync();

				var result = await _signInManager.PasswordSignInAsync(findedUser.UserName, userLoginRequest.Password, userLoginRequest.Persistent, userLoginRequest.Lock);

				if (result.Succeeded)
				{
					var roles = await _userManager.GetRolesAsync(findedUser);
					var token = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
					{
						UserName = findedUser.UserName,
						Email = findedUser.Email,
						Roles = roles,
						Id = findedUser.Id
					});
					var tokenResponse = new TokenResponse()
					{
						RefreshToken = token.RefreshToken,
						RefreshTokenExpireDate = token.Expiration.AddMinutes(10),
						AuthToken = token.AccessToken,
						AccessTokenExpireDate = token.Expiration
					};

					findedUser.RefreshToken= token.RefreshToken;
					findedUser.RefreshTokenEndDate= token.Expiration.AddMinutes(10);
					await _userManager.UpdateAsync(findedUser);

					return tokenResponse;
				}
				else
				{
					await _userManager.AccessFailedAsync(findedUser);
					var count = await _userManager.GetAccessFailedCountAsync(findedUser);
					if (count > 3)
					{
						await _userManager.SetLockoutEndDateAsync(findedUser, new DateTimeOffset(DateTime.Now.AddMinutes(5)));
					}
				}

			}
			return null;
		}

		public async Task<TokenResponse> UserSignInAsync(UserSignInRequest userSignInRequest)
		{
			User newUser = new()
			{
				UserName = userSignInRequest.UserName,
				Email = userSignInRequest.Email
			};
			var result = await _userManager.CreateAsync(newUser, userSignInRequest.Password);
			if (result.Succeeded)
			{
				await CreateRoleAsync("client");
				await _userManager.AddToRoleAsync(newUser, "client");
				var roles = await _userManager.GetRolesAsync(newUser);
				var token = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
				{
					UserName = newUser.UserName,
					Email = newUser.Email,
					Roles = roles,
					Id = newUser.Id
				});
				return new TokenResponse
				{
					AuthToken = token.AccessToken,
					AccessTokenExpireDate = token.Expiration
				};
			}
			return null;
		}
	}
}
