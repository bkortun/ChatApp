using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.HubContexts;
using SignalR.Models;

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
		public async Task<IActionResult> Get([FromRoute]string message)
		{
			await _messageHubService.SendAsync(message);
			return Ok();
		}

	
	}
}
