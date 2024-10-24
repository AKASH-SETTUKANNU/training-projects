using taskTracker.data;
using taskTracker.Repositories.EventManagementPro.Repositories;
using taskTracker.Repositories;
using taskTracker.services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register DataAccess
builder.Services.AddScoped<IDataAccess>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new DataAccess(connectionString);
});

// Register User services and repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<TaskService>();

builder.Services.AddScoped<IActivityRepository, ActivityRepository>();
builder.Services.AddScoped<ActivityRepository>();
builder.Services.AddScoped<ActivityService>();

// Add controllers
builder.Services.AddControllers();


// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.AllowAnyOrigin() 
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


var app = builder.Build();

// Configure CORS
app.UseCors("AllowSpecificOrigin");

// Configure Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

// Configure authorization middleware
app.UseAuthorization();

// Map controllers to routes
app.MapControllers();

// Run the application
app.Run();
