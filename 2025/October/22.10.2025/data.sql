CREATE TABLE cats (
    name VARCHAR(100),
    age INT
);

-- To show tables in psql, use the \dt command to list tables in the current schema, or use \d for a more general list of all database objects.
\dt


DROP TABLE cats;

INSERT INTO cats(name, age)
VALUES ('Jetson', 7);
