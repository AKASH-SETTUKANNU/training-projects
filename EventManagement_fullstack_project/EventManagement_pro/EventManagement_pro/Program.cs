using EventManagement_pro.Repositories;
using EventManagement_pro.Services;
using EventManagementPro.Data;
using EventManagementPro.Repositories;
using EventManagementPro.Services;
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

// Register Event services and repositories
builder.Services.AddScoped<IEventsRepository, EventsRepository>();
builder.Services.AddScoped<EventService>();

// Register Guest services and repositories
builder.Services.AddScoped<IGuestRepository, GuestRepository>();
builder.Services.AddScoped<GuestService>();

// Register Agenda services and repositories
builder.Services.AddScoped<IAgendaRepository, AgendaRepository>();
builder.Services.AddScoped<AgendaService>();

// Register Invitation services and repositories
builder.Services.AddScoped<IInvitationRepository, InvitationRepository>();
builder.Services.AddScoped<InvitationService>();

// Register Notification services and repositories
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<NotificationService>();

// Add controllers
builder.Services.AddControllers();

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure Swagger UI
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

// Map controllers
app.MapControllers();

// Run the application
app.Run();
