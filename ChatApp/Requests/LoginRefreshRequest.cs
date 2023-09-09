namespace ChatApp.Requests
{
	public class LoginRefreshRequest
	{
        public string Email  { get; set; }
        public string RefreshToken  { get; set; }
    }
}
