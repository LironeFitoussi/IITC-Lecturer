CREATE TABLE people (
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    age INT
);

--

INSERT INTO people (first_name, last_name, age)
VALUES ('Tina', 'Belcher', 13);

-- 
\dt

--
SELECT * FROM people;


INSERT INTO people (first_name, last_name, age)
VALUES ('Bob', 'Belcher', 42);