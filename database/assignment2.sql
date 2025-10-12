-- Assignment 2 - SQL Practice
-- Task One: Write SQL Statements

-- 1. Insert Tony Stark record to account table
-- Note: account_id and account_type will handle their own values
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- 2. Modify Tony Stark record to change account_type to "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';


-- 3. Delete Tony Stark record from database
DELETE FROM account
WHERE account_email = 'tony@starkent.com';


-- 4. Modify GM Hummer record to replace "small interiors" with "a huge interior"
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';


-- 5. Select make, model, and classification name for Sport category using INNER JOIN
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';


-- 6. Update all inventory records to add "/vehicles" to image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');