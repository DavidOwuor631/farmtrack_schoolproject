USE agriSmart;

CREATE OR ALTER PROCEDURE getUserById (
    @id VARCHAR(255)
)

AS 
BEGIN 
SELECT * FROM users
WHERE @id=id
AND isDeleted=0     --necessary to prevent selecting deleted users
END 

GO;