using System;
using Microsoft.AspNetCore.Builder;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using SignalR.Hubs;

namespace SignalR.Configurations
{
	public static class HubRegistration
	{
		public static void MapHubs(this WebApplication app)
		{
			app.MapHub<MessageHub>("/messages");
		}
	}
}
