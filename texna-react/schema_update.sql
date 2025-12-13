
-- Add unique constraint to products title
ALTER TABLE products ADD CONSTRAINT products_title_key UNIQUE (title);

-- Add unique constraint to services title
ALTER TABLE services ADD CONSTRAINT services_title_key UNIQUE (title);
