using DataAccess.Contexts;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Rooms
{
	public class RoomRepository : IRoomRepository
	{
		protected ChatAppContext context { get; }
		public RoomRepository(ChatAppContext chatAppContext)
		{
			context = chatAppContext;
		}
		public async Task AddAsync(Room room)
		{
			var addedEntity = context.Entry(room);
			addedEntity.State = EntityState.Added;
			await context.SaveChangesAsync();
		}

		public async Task DeleteAsync(Room room)
		{
			var deletedEntity = context.Entry(room);
			deletedEntity.State = EntityState.Deleted;
			await context.SaveChangesAsync();
		}

		public async Task<List<Room>> GetAllAsync()
		{
			return await context.Set<Room>().ToListAsync();
		}

		public Task<Room> GetByIdAsync(string id)
		{
			return context.Set<Room>().SingleOrDefaultAsync(r => r.Id == Guid.Parse(id));
		}

		public async Task UpdateAsync(Room room)
		{
			var updatedEntity = context.Entry(room);
			updatedEntity.State = EntityState.Modified;
			await context.SaveChangesAsync();
		}
	}
}
