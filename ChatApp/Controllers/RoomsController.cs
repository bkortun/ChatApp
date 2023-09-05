using ChatApp.Requests;
using ChatApp.Responses;
using DataAccess.Rooms;
using Entities;
using Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
	[Authorize(Roles = "client")]
	[Route("api/[controller]")]
	[ApiController]
	public class RoomsController : ControllerBase
	{
		private readonly IRoomRepository _roomRepository;
		private readonly IAuthService _authService;

		public RoomsController(IRoomRepository roomRepository, IAuthService authService)
		{
			_roomRepository = roomRepository;
			_authService = authService;
		}


		[HttpPost]
		public async Task<IActionResult> Add(RoomAddRequest request)
		{
			Room room = new()
			{
				HostId = request.HostId,
				Name = request.Name,
				Description = request.Description,
				IsPrivate = request.IsPrivate,
				Password = request.Password,
			};
			await _roomRepository.AddAsync(room);
			return Ok();
		}
				
		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var result=await _roomRepository.GetAllAsync();
			return Ok(result);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(string id)
		{
			var result = await _roomRepository.GetByIdAsync(id);
			return Ok(result);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			var result = await _roomRepository.GetByIdAsync(id);
			await _roomRepository.DeleteAsync(result);
			return Ok(result);
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> CheckPassword(CheckPasswordRequest checkPasswordRequest)
		{
			var room=await _roomRepository.GetByIdAsync(checkPasswordRequest.RoomId);
			if (room.Password == checkPasswordRequest.Password)
			{
				if (room.HostId == checkPasswordRequest.UserId)
				{
					await _authService.CreateRoleAsync($"host-{room.Id}");
					return Ok(await _authService.AssaignRoleToUserAsync( $"host-{room.Id}", checkPasswordRequest.UserId));					
				}
				else
				{
					await _authService.CreateRoleAsync($"guest-{room.Id}");
					return Ok(await _authService.AssaignRoleToUserAsync( $"guest-{room.Id}", checkPasswordRequest.UserId));
				}
			}
			return BadRequest();
		}
	}
}
