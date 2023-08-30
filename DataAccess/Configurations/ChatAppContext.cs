using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Contexts
{
	public class ChatAppContext : DbContext
	{
		public ChatAppContext(DbContextOptions<ChatAppContext> options) : base(options)
		{
		}

        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Room>(a =>
			{
				a.ToTable("Rooms").HasKey(k => k.Id);
				a.Property(p => p.Id).HasColumnName("Id");
				a.Property(p => p.Name).HasColumnName("Name");
				a.Property(p => p.HostId).HasColumnName("HostId");
			});

		}
	}
}
