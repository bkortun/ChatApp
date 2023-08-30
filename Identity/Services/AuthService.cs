﻿using Identity.Entities;
using Identity.Entities.Dtos;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
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

		public async Task CreateRoleAsync(string roleName)
		{
			var isExist = await _roleManager.RoleExistsAsync(roleName);
			if (!isExist)
			{
				Role role = new(roleName);
				await _roleManager.CreateAsync(role);
			}
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
					var accessToken = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
					{
						UserName = findedUser.UserName,
						Email = findedUser.Email,
						Role = roles
					});
					return new TokenResponse
					{
						AuthToken = accessToken.Token,
						AccessTokenExpireDate = accessToken.Expiration
					};
				}
				else
				{
					await _userManager.AccessFailedAsync(findedUser);
					var count = await _userManager.GetAccessFailedCountAsync(findedUser);
					if (count > 3)
					{
						await _userManager.SetLockoutEndDateAsync(findedUser, new DateTimeOffset(DateTime.Now.AddMinutes(1)));
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
				await _userManager.AddToRoleAsync(newUser, "client");
				var roles= await _userManager.GetRolesAsync(newUser);
				var accessToken = await _tokenService.GenerateTokenAsync(new GenerateTokenRequest
				{
					UserName = newUser.UserName,
					Email = newUser.Email,
					Role = roles
				});
				return new TokenResponse
				{
					AuthToken = accessToken.Token,
					AccessTokenExpireDate = accessToken.Expiration
				};
			}
			return null;
		}
	}
}