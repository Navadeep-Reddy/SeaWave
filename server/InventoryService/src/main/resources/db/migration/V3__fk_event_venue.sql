ALTER TABLE event
ADD CONSTRAINT fk_venue_id
FOREIGN KEY (venue_id) REFERENCES venue(id);