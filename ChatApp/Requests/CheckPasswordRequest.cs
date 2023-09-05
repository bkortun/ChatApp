namespace ChatApp.Requests
{
	public class CheckPasswordRequest
	{
        public string RoomId { get; set; }
        public string Password { get; set; }
        public string UserId { get; set; }
    }
}
