-- CREATE TYPE visibility_status AS ENUM(
--     'public',     -- Listed on the website and accessible via link
--     'unlisted',   -- Not listed on the website, but accessible via direct link
--     'private'     -- Only visible to the seller (owner of the product)
--   );

create table users (
  user_id serial primary key,
  email text unique not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  password_hash text not null,
  phone VARCHAR(15),
  user_address text,
  full_name text not null
);

create table products (
  product_id UUID default gen_random_uuid() primary key,
  product_description text,
  product_address text,
  condition text,
  title text not null,
  price NUMERIC(15,2) not null,
  phone VARCHAR(15),
  seller int,
  views int default 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  foreign key (seller) references users(user_id) on delete set null,
  visibility visibility_status DEFAULT 'public'
);

create table categories (
  category_id serial primary key,
  category_name text unique not null
);

create table product_categories (
  product_id UUID,
  category_id int,
  primary key (product_id, category_id),
  foreign KEY (product_id) references products(product_id) on delete cascade,
  foreign KEY (category_id) references categories(category_id) on delete cascade
);

create table images(
  image_id serial primary key,
  product_id uuid not null,
  foreign key (product_id) references products(product_id) on delete cascade,
  image_url text not null,
  image_index int
);