using Identity.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Configurations
{
	public class ChatIdentityContext : IdentityDbContext<User, Role, string>
	{
		public ChatIdentityContext(DbContextOptions<ChatIdentityContext> options) : base(options)
		{
		}
	}
}
