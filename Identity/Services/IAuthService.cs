﻿using Identity.Entities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services
{
    public interface IAuthService
	{
		Task<TokenResponse> UserLoginAsync(UserLoginRequest userLoginRequest);
		Task<TokenResponse> UserSignInAsync(UserSignInRequest userSignInRequest);
		Task CreateRoleAsync(string roleName);

	}
}