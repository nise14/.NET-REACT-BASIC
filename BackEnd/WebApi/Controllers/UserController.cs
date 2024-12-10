using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Dtos;
using WebApi.Dtos.Request;
using WebApi.Dtos.Response;
using WebApi.Repositories;
using WebApi.Repositories.Entities;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public UserController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    private LoginResponseDto Token(UserDto user)
    {
        LoginResponseDto response = new();

        try
        {
            var expires = DateTime.UtcNow.AddHours(16);

            var claims = new List<Claim>(){
                new(ClaimTypes.Name ,user.Name)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"]!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: expires,
                signingCredentials: credentials
            );

            response.Token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        catch (Exception ex)
        {
            response.Token = $"ERROR {ex.Message}";
        }

        return response;
    }

    private string EncryptedPassword(string value){
        SHA512 sha512 = SHA512.Create();
        ASCIIEncoding encoding = new();
        byte[] valueToBytes = sha512.ComputeHash(encoding.GetBytes(value));
        StringBuilder valueEncrypted = new();

        for(var i = 0; i<valueToBytes.Length;i++){
            valueEncrypted.AppendFormat("{0:x2}",valueToBytes[i]);
        }

        return valueEncrypted.ToString();
    }

    [HttpPost("Login")]
    public async ValueTask<ActionResult<LoginResponseDto>> Login(LoginRequestDto request){
        try
        {
            var encryptedPassword = EncryptedPassword(request.Password);

            var user = await (from tUser in _context.Users
                                 where tUser.Name == request.UserName && tUser.Password == encryptedPassword
                                 select new UserDto
                                 {
                                     Id = tUser.Id,
                                     Name = tUser.Name,
                                     Password = "X"
                                 }).FirstOrDefaultAsync();

            if(user == null){
                return NotFound($"User doesn't exist");
            }

            return Ok(Token(user));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPost("Registration")]
    public async ValueTask<ActionResult<LoginResponseDto>> Create(LoginRequestDto request)
    {
        try
        {
            var encryptedPassword = EncryptedPassword(request.Password);

            var user = new User
            {
                Name = request.UserName,
                Password = encryptedPassword
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var newUser = await (from tUser in _context.Users
                                 where tUser.Name == request.UserName
                                 select new UserDto
                                 {
                                     Id = tUser.Id,
                                     Name = tUser.Name,
                                     Password = "X"
                                 }).FirstOrDefaultAsync();

            return Ok(Token(newUser!));

        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}