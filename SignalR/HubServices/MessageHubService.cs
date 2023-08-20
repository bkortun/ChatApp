using Microsoft.AspNetCore.SignalR;
using SignalR.Contracts;
using SignalR.HubContexts;
using SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.HubServices
{
	public class MessageHubService:IMessageHubService
	{
		private readonly IHubContext<MessageHub,IMessageClient> _hubContext;

		public MessageHubService(IHubContext<MessageHub, IMessageClient> hubContext)
		{
			_hubContext = hubContext;
		}

		public async Task AddToGroupAsync(string connectionId)
		{
			await _hubContext.Groups.AddToGroupAsync(connectionId, "room1");
		}

		public async Task RemoveToGroupAsync(string connectionId)
		{
			await _hubContext.Groups.RemoveFromGroupAsync(connectionId, "room1");
		}

		public async Task SendAsync(string message)
		{
			await _hubContext.Clients.All.ReceiveMessage(message);
		}
	}
}
