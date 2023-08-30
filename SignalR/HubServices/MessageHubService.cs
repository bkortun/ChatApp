using Microsoft.AspNetCore.SignalR;
using SignalR.Contracts;
using SignalR.HubContexts;
using SignalR.Hubs;
using SignalR.Test;
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

		public async Task SendAsync(string message)
		{
			//await _hubContext.Clients.All.ReceiveMessage(message);
		}
	}
}
