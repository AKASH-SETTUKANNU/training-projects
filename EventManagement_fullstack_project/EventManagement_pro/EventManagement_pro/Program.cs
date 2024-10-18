using EventManagement_pro.Repositories;
using EventManagement_pro.Services;
using EventManagementPro.Data;
using EventManagementPro.Repositories;
using EventManagementPro.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IDataAccess>(provider =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    return new DataAccess(connectionString);
});


builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddScoped<EventService>();
builder.Services.AddScoped<IEventsRepository, EventsRepository>();

builder.Services.AddScoped<GuestService>();
builder.Services.AddScoped<IGuestRepository, GuestRepository>();

builder.Services.AddScoped<AgendaService>();
builder.Services.AddScoped<IAgendaRepository,AgendaRepository>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();
