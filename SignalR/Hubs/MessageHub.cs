using Microsoft.AspNetCore.SignalR;
using SignalR.Contracts;
using SignalR.Models;
using SignalR.Test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Hubs
{
	public class MessageHub : Hub<IMessageClient>
	{

		public async Task AddClientAsync(string username, string userId)
		{
			Client client = new()
			{
				ConnectionId = userId,
				Username = username
			};
			List<string> cliendIds= new List<string>();
			ClientTestSource.Clients.ForEach((item) =>
			{
				cliendIds.Add(item.ConnectionId);
			});

			if (!cliendIds.Contains(userId))
			{
				ClientTestSource.Clients.Add(client);
				await Clients.Others.ClientJoined(client.Username);
			}
		}

		public async Task RemoveClientAsync(string userId)
		{

			var selectedClient=ClientTestSource.Clients.SingleOrDefault(c => c.ConnectionId == userId);
			ClientTestSource.Clients.Remove(selectedClient);

			await Clients.Others.ClientLeft(selectedClient.Username);
		}

		public async Task AddClientToGroupAsync(string groupName)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
		}

		public async Task RemoveClientToGroupAsync(string groupName)
		{
			await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
		}

		public async Task ListClientsAsync()
		{
			await Clients.All.ListClients(ClientTestSource.Clients);
		}
		public async Task SendAsync(string message,string userId)
		{
			var senderClient = ClientTestSource.Clients.FirstOrDefault(a => a.ConnectionId == userId);
			await Clients.All.ReceiveMessage(message, senderClient);
		}
		public override async Task OnConnectedAsync()
		{
			await Clients.Caller.ClientJoined(Context.ConnectionId);
		}

		public override async Task OnDisconnectedAsync(Exception? exception)
		{
			await Clients.Others.ClientLeft(Context.ConnectionId);
		}
	}
}
