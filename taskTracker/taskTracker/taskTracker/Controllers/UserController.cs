using Microsoft.AspNetCore.Mvc;
using taskTracker.models;
using taskTracker.services;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;

namespace taskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly ILogger<UserController> _logger;

        public UserController(UserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserData user)
        {
            if (user == null)
                return BadRequest("User data is required.");

            try
            {
                var createdUser = await _userService.CreateUser(user);
                return Created(string.Empty, createdUser); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the user.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUser(id);
                if (user == null)
                    return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the user.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("email-exists")]
        public async Task<IActionResult> CheckEmailExists([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest("Email is required.");

            try
            {
                bool userExists = await _userService.IsUserExistsByEmail(email);
                return Ok(userExists);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while checking if email exists.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginData logindata)
        {
            if (logindata == null)
                return BadRequest("Login data is required.");

            try
            {
                var user = await _userService.GetUserByEmail(logindata.UserEmail);
                if (user == null)
                    return NotFound("User not found.");

                if ( logindata.Password != user.userPassword)
                    return Unauthorized("Invalid password.");

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
