CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

create table carts (
  id uuid DEFAULT uuid_generate_v4() NOT NULL, 
  user_id uuid NOT NULL, 
  created_at DATE NOT NULL, 
  updated_at DATE NOT NULL, 
  status cart_status,
  PRIMARY KEY (id));
  
insert into carts (user_id, created_at, updated_at, status) values (uuid_generate_v4(), now(), now(), 'OPEN');


-- 

create table cart_items (
	cart_id uuid references carts(id),
	product_id uuid,
	count integer default 0
);

insert into cart_items values ('348c3b2f-d5fd-4f13-9ad0-7b80d379e15e', uuid_generate_v4(), 2);