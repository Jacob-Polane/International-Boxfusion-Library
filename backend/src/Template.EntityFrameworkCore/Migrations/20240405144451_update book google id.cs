using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Template.Migrations
{
    /// <inheritdoc />
    public partial class updatebookgoogleid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "uniqueId",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "uniqueId",
                table: "Books");
        }
    }
}
