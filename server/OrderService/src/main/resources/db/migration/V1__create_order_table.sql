CREATE TABLE "order" (
                         order_id BIGSERIAL PRIMARY KEY,
                         created_at TIMESTAMP WITHOUT TIME ZONE,
                         user_id VARCHAR(255),
                         user_name VARCHAR(255),
                         user_email VARCHAR(255),
                         total_price NUMERIC(19, 2),
                         ticket_count INTEGER NOT NULL,
                         event_id BIGINT,
                         event_name VARCHAR(255),
                         venue_id BIGINT,
                         venue_name VARCHAR(255)
);
