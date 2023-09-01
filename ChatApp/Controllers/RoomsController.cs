using ChatApp.Requests;
using DataAccess.Rooms;
using Entities;
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

		public RoomsController(IRoomRepository roomRepository)
		{
			_roomRepository = roomRepository;
		}

		
		[HttpPost]
		public async Task<IActionResult> Add(RoomAddRequest request)
		{
			Room room = new()
			{
				HostId = request.HostId,
				Name = request.Name,
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
	}
}
