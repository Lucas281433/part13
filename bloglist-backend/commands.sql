CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Dan Abramov', 'http://overreacted.io/things-i-dont-know-as-of-2018', 'Things I Don´t Know as of 2018');
INSERT INTO blogs (author, url, title) VALUES ('Martin Fowler', 'http://martinfowler.com/articles/distributed-objects-microservices.html', 'Micriservices and the First Law of Distributed Objects');
