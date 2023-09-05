using DataAccess.Rooms;
using Identity.Services;
using Microsoft.Extensions.DependencyInjection;
using SignalR.HubContexts;
using SignalR.HubServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalR.Configurations
{
    public static class SingalRServiceRegistration
    {
        public static void AddSignalRServices(this IServiceCollection service)
        {
            service.AddTransient<IMessageHubService, MessageHubService>();
            service.AddTransient<IRoomRepository, RoomRepository>();
            service.AddTransient<IAuthService, AuthService>();
            service.AddSignalR();
        }
    }
}
