﻿using Microsoft.AspNetCore.SignalR;
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
	public class MessageHub:Hub<IMessageClient>
	{
		
		public async Task AddClientAsync(string username)
		{
			Client client = new()
			{
				ConnectionId=Context.ConnectionId,
				Username=username
			};
			ClientTestSource.Clients.Add(client);
			await Clients.Others.ClientJoined(client.Username);
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
		public async Task SendAsync(string message)
		{
			var senderClient = ClientTestSource.Clients.FirstOrDefault(a => a.ConnectionId == Context.ConnectionId);
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
