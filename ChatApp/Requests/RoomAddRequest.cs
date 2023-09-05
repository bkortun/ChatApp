namespace ChatApp.Requests
{
	public class RoomAddRequest
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public bool IsPrivate { get; set; }
		public string? Password { get; set; }
		public string? HostId { get; set; }
	}
}
