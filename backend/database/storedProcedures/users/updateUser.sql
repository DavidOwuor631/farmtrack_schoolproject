USE agriSmart;

CREATE OR ALTER PROCEDURE updateUser (
    @id VARCHAR(255),
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    -- @role VARCHAR(255),  no. you cannot update role. create new account instead
)

AS
BEGIN
UPDATE users SET (id=@id, name=@name, email=@email, password=@password)
WHERE id=@id
END

GO;