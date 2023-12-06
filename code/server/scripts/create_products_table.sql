CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Changed to UUID and added default value
  status VARCHAR(12),
  price DECIMAL(10, 2),
  description VARCHAR(800),
  seller_id UUID REFERENCES public.users(id), -- changed to UUID and correct reference
  category VARCHAR(30),
  quantity INT
);
