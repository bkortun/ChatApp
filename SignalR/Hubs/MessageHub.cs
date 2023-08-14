using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
	public class MessageHub:Hub
	{
		public async Task SendAsync(string message)
		{
			await Clients.All.SendAsync("ReceiveMessage", message);
		}
		public override async Task OnConnectedAsync()
		{
			await Clients.All.SendAsync("ClientJoined", Context.ConnectionId);
		}

		public override async Task OnDisconnectedAsync(Exception? exception)
		{
			await Clients.All.SendAsync("ClientLeft", Context.ConnectionId);
		}
	}
}
