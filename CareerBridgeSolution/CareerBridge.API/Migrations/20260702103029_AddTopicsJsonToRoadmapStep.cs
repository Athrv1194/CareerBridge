using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CareerBridge.API.Migrations
{
    /// <inheritdoc />
    public partial class AddTopicsJsonToRoadmapStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TopicsJson",
                table: "RoadmapSteps",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TopicsJson",
                table: "RoadmapSteps");
        }
    }
}
