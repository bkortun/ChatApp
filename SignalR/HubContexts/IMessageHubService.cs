using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.HubContexts
{
	public interface IMessageHubService
	{
		Task SendAsync(string message);

		Task AddToGroupAsync(string connectionId);
		Task RemoveToGroupAsync(string connectionId);
	}
}
