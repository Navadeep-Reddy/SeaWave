CREATE TABLE venue (
    id BIGSERIAL PRIMARY KEY,
    name varchar NOT NULL ,
    total_capacity int NOT NULL ,
    address varchar NOT NULL
);

CREATE TABLE event (
    id BIGSERIAL PRIMARY KEY,
    total_capacity int NOT NULL,
    left_capacity int NOT NULL,
    name varchar NOT NULL ,
    venue_id BIGINT
);