drop table if exists users;
CREATE TABLE if not exists users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL
);

DROP TABLE IF EXISTS repositories;
CREATE TABLE repositories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    github_url TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
