using DataAccess.Rooms;
using Identity.Services;
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
		private readonly IRoomRepository _roomRepository;
		private readonly IAuthService _authService;
		public MessageHub(IRoomRepository roomRepository, IAuthService authService)
		{
			_roomRepository = roomRepository;
			_authService = authService;
		}
		public async Task AddClientAsync(string username, string userId, string groupName)
		{
			Client client = new()
			{
				ConnectionId = userId,
				Username = username,
				GroupName = groupName
			};
			List<string> cliendIds = new List<string>();
			ClientTestSource.Clients.ForEach((item) =>
			{
				cliendIds.Add(item.ConnectionId);
			});

			if (!cliendIds.Contains(userId))
			{
				ClientTestSource.Clients.Add(client);
				Context.Items["id"] = userId;
				await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
			}
		}
		public async Task ListClientsAsync(string groupName)
		{
			var clientsInSelectedGroup = ClientTestSource.Clients.Where(c => c.GroupName == groupName).ToList();
			await Clients.Group(groupName).ListClients(clientsInSelectedGroup);
		}
		public async Task SendAsync(string message, string userId, string groupName)
		{
			var senderClient = ClientTestSource.Clients.FirstOrDefault(a => a.ConnectionId == userId);
			await Clients.Group(groupName).ReceiveMessage(message, senderClient);
		}
		public override async Task OnDisconnectedAsync(Exception? exception)
		{
			if (Context.Items.TryGetValue("id", out var id))
			{
				string userId = id.ToString();
				var selectedClient = ClientTestSource.Clients.SingleOrDefault(c => c.ConnectionId == userId);
				ClientTestSource.Clients.Remove(selectedClient);

				await Groups.RemoveFromGroupAsync(Context.ConnectionId, selectedClient.GroupName);
				var clientsInSelectedGroup = ClientTestSource.Clients.Where(c => c.GroupName == selectedClient.GroupName).ToList();
				await Clients.Group(selectedClient.GroupName).ListClients(clientsInSelectedGroup);

				var room = await _roomRepository.GetByIdAsync(selectedClient.GroupName);
				if (room.IsPrivate)
				{
					if (room.HostId == userId)
					{
						await _authService.RemoveRoleToUserAsync($"host-{room.Id}", userId);
						await _authService.DeleteRoleAsync($"host-{room.Id}");
					}
					else
					{
						await _authService.RemoveRoleToUserAsync($"guest-{room.Id}", userId);
						await _authService.DeleteRoleAsync($"guest-{room.Id}");
					}
						
				}

				if (clientsInSelectedGroup.Count == 0)
					await _roomRepository.DeleteAsync(selectedClient.GroupName);
			}
		}
	}
}
