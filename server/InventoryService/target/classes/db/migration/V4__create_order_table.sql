CREATE TABLE "order"
(
    id BIGSERIAL PRIMARY KEY,
    total DECIMAL(10, 2) NOT NULL,
    quantity BIGINT NOT NULL,
    placed_at timestamp DEFAULT current_timestamp,
    customer_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    CONSTRAINT fk_order_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE ,
    CONSTRAINT  fk_order_customer FOREIGN KEY  (customer_id) REFERENCES Customer(id) ON DELETE CASCADE
);