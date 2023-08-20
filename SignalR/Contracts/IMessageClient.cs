using SignalR.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Contracts
{
	public interface IMessageClient
	{
		Task ListClients(List<Client> clients);
		Task ReceiveMessage(string message);
		Task ClientJoined(string connectionId);
		Task ClientLeft(string connectionId);


	}
}
