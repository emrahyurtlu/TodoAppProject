# TodoAppProject
To run the project you should follow the steps below, 
- Prepare database in ms-sql-server.
- Database ```user: todo_usr```, ```password:todo123```
- Then run the web api.
- Endpoint will be like this ```http://localhost:5108/api/todoitems```
- Finally, run the react app inside todo-react/ via ```npm run dev``` command.


## Create Database TodosDb
```CREATE DATABASE TodosDb```
## Create TodoItem Table in TodosDb database 
```
USE [TodosDb]
GO

/****** Object:  Table [dbo].[TodoItem]    Script Date: 30.08.2023 08:07:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TodoItem](
	[TodoItemId] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Description] [text] NULL,
	[State] [int] NULL,
	[CreatedAt] [datetime] NOT NULL,
	[UpdatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_TodoItem] PRIMARY KEY CLUSTERED 
(
	[TodoItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO```

## Create user todo_usr for TodosDb database 
```USE TodosDb;
CREATE LOGIN todo_usr WITH PASSWORD = 'todo123';
CREATE USER todo_usr FOR LOGIN todo_usr;

ALTER ROLE db_datareader ADD MEMBER todo_usr;
ALTER ROLE db_datawriter ADD MEMBER todo_usr;
```

Now, your database is ready.

Have a nice day.
