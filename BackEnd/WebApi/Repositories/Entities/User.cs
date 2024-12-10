namespace WebApi.Repositories.Entities;

public class User
{
    public long Id { get; set; }
    public string Name { get; set; } = null!;
    public string Password { get; set; } = null!;
}