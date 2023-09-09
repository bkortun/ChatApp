using ChatApp.Requests;
using Identity.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;

		public AuthController(IAuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> Login([FromBody]LoginRequest loginRequest)
		{
			var token=await _authService.UserLoginAsync(new()
			{
				Email = loginRequest.Email,
				Lock = loginRequest.Lock,
				Password = loginRequest.Password,
				Persistent = loginRequest.Persistent,
			});
			return Ok(token);
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> SignIn([FromBody] SignInRequest signInRequest)
		{
			if(signInRequest.Password==signInRequest.PasswordRepeat)
			{
				var token = await _authService.UserSignInAsync(new()
				{
					Email = signInRequest.Email,
					UserName = signInRequest.UserName,
					Password = signInRequest.Password,
				});
				return Ok(token);
			}
			return BadRequest("Password and repeat password must be same");
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> AddRole([FromBody] string roleName)
		{
			await _authService.CreateRoleAsync(roleName);
			return Ok();
		}
	}
}
