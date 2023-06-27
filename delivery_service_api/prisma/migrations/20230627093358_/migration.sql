-- This is an empty migration.
-- admin table
ALTER TABLE
    admin
ADD
    CONSTRAINT chk_admin_code CHECK (char_length(code) = 5);

ALTER TABLE
    admin
ADD
    CONSTRAINT chk_admin_phno CHECK (phone_number like '09%');

-- biker table
ALTER TABLE
    biker
ADD
    CONSTRAINT chk_biker_code CHECK (char_length(code) = 5);

ALTER TABLE
    biker
ADD
    CONSTRAINT chk_biker_phno CHECK (phone_number like '09%');

-- online_shop table
ALTER TABLE
    online_shop
ADD
    CONSTRAINT chk_online_shop_phno CHECK (phone_number like '09%');

-- orders table
ALTER TABLE
    orders
ADD
    CONSTRAINT chk_orders_phno CHECK (phone_number like '09%');