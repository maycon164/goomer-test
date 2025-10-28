CREATE TABLE promotions
(
    id           SERIAL PRIMARY KEY,
    description  VARCHAR(255)   NOT NULL,
    price        NUMERIC(10, 2) NOT NULL,
    days_of_week TEXT[] NOT NULL,
    init_time    TIME           NOT NULL,
    end_time     TIME           NOT NULL,
    products_ids INT[] NOT NULL,
    is_active    BOOLEAN        NOT NULL DEFAULT TRUE
);
