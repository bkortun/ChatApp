using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.HubContexts;

namespace ChatApp.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MessagesController : ControllerBase
	{
		private readonly IMessageHubService _messageHubService;

		public MessagesController(IMessageHubService messageHubService)
		{
			_messageHubService = messageHubService;
		}

		[HttpGet("{message}")]
		public async Task<IActionResult> Get(string message)
		{
			await _messageHubService.SendAsync(message);
			return Ok();
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> AddToGroup(string connectionId)
		{
			await _messageHubService.AddToGroupAsync(connectionId);
			return Ok();
		}

		[HttpPost("[action]")]
		public async Task<IActionResult> RemoveToGroup(string connectionId)
		{
			await _messageHubService.RemoveToGroupAsync(connectionId);
			return Ok();
		}
	}
}
