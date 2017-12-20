using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AnsBallBot.Migrations
{
    public partial class RenameTableMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Dailys",
                table: "Dailys");

            migrationBuilder.RenameTable(
                name: "Dailys",
                newName: "ChatStates");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatStates",
                table: "ChatStates",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatStates",
                table: "ChatStates");

            migrationBuilder.RenameTable(
                name: "ChatStates",
                newName: "Dailys");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dailys",
                table: "Dailys",
                column: "Id");
        }
    }
}
