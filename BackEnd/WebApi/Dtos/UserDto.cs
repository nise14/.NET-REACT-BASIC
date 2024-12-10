namespace WebApi.Dtos;

public class UserDto
{
    public long Id { get; set; }
    public string Name { get; set; }=null!;
    public string Password { get; set; }=null!;
}