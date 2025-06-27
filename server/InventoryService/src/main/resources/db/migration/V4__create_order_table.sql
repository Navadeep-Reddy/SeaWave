CREATE TABLE "order"
(
    id BIGSERIAL PRIMARY KEY,
    total DECIMAL(10, 2) NOT NULL,
    quantity BIGINT NOT NULL,
    placed_at timestamp NOT NULL DEFAULT current_timestamp
)