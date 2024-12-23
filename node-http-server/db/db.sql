--todo
CREATE TABLE [todo]
(
    [id]    INTEGER PRIMARY KEY AUTOINCREMENT,
    [text]  CHAR(128) NOT NULL,
    [state] INTEGER(1)
);

--todo-user
CREATE TABLE [todo_user]
(
    [id]     INTEGER PRIMARY KEY AUTOINCREMENT,
    [text]   CHAR(128) NOT NULL,
    [state]  INTEGER(1),
    [userId] INTEGER,
    FOREIGN KEY (userId) REFERENCES user (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


--user
CREATE TABLE [user]
(
    [id]       INTEGER PRIMARY KEY AUTOINCREMENT,
    [name]     CHAR(36)  NOT NULL,
    [password] CHAR(128) NOT NULL
);

--session
CREATE TABLE [session]
(
    [id]      INTEGER PRIMARY KEY AUTOINCREMENT,
    [key]     CHAR(36)  NOT NULL,
    [name]    CHAR(36)  NOT NULL,
    [value]   CHAR(256) NOT NULL,
    [created] INTEGER,
    [expires] INTEGER
);