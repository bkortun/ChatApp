using DataAccess.Contexts;
using DataAccess.Rooms;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Configurations
{
	public static class ServiceRegisteration
	{
		public static void AddDataAccessService(this IServiceCollection service, IConfiguration configuration)
		{
			service.AddDbContext<ChatAppContext>(options =>
				options.UseNpgsql(configuration["ConnectionStrings:AppConnectionString"]));

			service.AddScoped<IRoomRepository, RoomRepository>();






		}

	}
}
