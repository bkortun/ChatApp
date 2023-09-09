using Identity.Entities;
using Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Identity.Configurations
{
	public static class ServiceRegistrations
	{
		public static void AddIdentityService(this IServiceCollection service, IConfiguration configuration)
		{
			service.AddDbContext<ChatIdentityContext>(options =>
				options.UseNpgsql(configuration["ConnectionStrings:IdentityConnectionString"]));

			service.AddIdentity<User, Role>(options =>
			{
				options.Password.RequiredLength = 3;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireDigit = false;
				options.Password.RequireLowercase = false;
				options.Password.RequireUppercase = false;
				options.User.RequireUniqueEmail = true;
			}).AddRoleManager<RoleManager<Role>>()
			.AddEntityFrameworkStores<ChatIdentityContext>();

			service.AddScoped<ITokenService, Services.TokenHandler>();
			service.AddScoped<IAuthService, AuthService>();


			service.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(o =>
			{
				o.TokenValidationParameters = new TokenValidationParameters
				{
					ValidIssuer = configuration["IdentitySettings:Issuer"],
					ValidAudience = configuration["IdentitySettings:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["IdentitySettings:SecretKey"])),
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ClockSkew = TimeSpan.Zero
				};
			});


			service.AddAuthorization();



		}
	}
}
