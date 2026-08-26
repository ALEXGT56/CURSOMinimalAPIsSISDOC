namespace SisDoc.Business.DTO.Request.Auth
{
    public class LoginRequest
    {
        public string UserName { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
