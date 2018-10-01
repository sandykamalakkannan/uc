use sakila;

describe actor;

select first_name, last_name
from actor;

SELECT upper( CONCAT(first_name,  ' ', last_name) )AS ' Actor Name'
FROM actor;


select actor_id,first_name,last_name 
from actor
where first_name like 'Joe';


select actor_id,first_name,last_name 
from actor
where last_name like '%GEN%';

SELECT actor_id, first_name, last_name 
FROM actor
WHERE last_name LIKE '%LI%'
ORDER BY last_name, first_name;

describe country;

select country_id, country
from country
where country in ('Afghanistan','Bangladesh','China');



describe actor;


alter table actor 
add column description blob;

alter table actor
drop column description;

select last_name, count(*) as 'count'
from actor 
group by last_name;


select last_name, count(*) as 'count'
from actor 
group by last_name
having count >= 2;

#4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.

update actor
set first_name = 'HARPO'
where first_name = 'GROUCHO' AND last_name = 'Williams';

#4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO.

update actor
set first_name ='GROUCHO'
where first_name = 'HARPO' AND last_name = 'Williams';


#5a. You cannot locate the schema of the address table. Which query would you use to re-create it?


SHOW CREATE TABLE address;
#6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address

SELECT s.first_name, s.last_name, a.address
FROM staff s LEFT JOIN address a ON s.address_id = a.address_id;




SELECT s.first_name, s.last_name, sum(p.amount)
FROM staff s LEFT JOIN payment p ON s.staff_id = p.staff_id
and p.payment_date like '2005-08%'
group by s.first_name, s.last_name;

#6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.

SELECT f.title, COUNT(a.actor_id) AS 'TOTAL'
FROM film f 
INNER JOIN film_actor  a ON f.film_id = a.film_id
GROUP BY f.title;

#6d. How many copies of the film Hunchback Impossible exist in the inventory system?



SELECT title, (
SELECT COUNT(*) FROM inventory
WHERE film.film_id = inventory.film_id
) AS 'Number of Copies'
FROM film
WHERE title = "Hunchback Impossible";

#6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:


SELECT c.first_name, c.last_name, SUM(p.amount) AS 'total_paid'
FROM customer c LEFT JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.first_name, c.last_name
ORDER BY c.last_name;



SELECT title
FROM film
WHERE title LIKE 'K%' OR title LIKE 'Q%'
AND language_id=(SELECT language_id FROM language where name='English');


SELECT first_name, last_name
FROM actor
WHERE actor_id IN
(
Select actor_id
FROM film_actor
WHERE film_id IN 
(
SELECT film_id
FROM film
WHERE title = 'Alone Trip'
));

SELECT c.first_name, c.last_name, c.email 
FROM customer c
JOIN address a ON (c.address_id = a.address_id)
JOIN city cty
ON (cty.city_id = a.city_id)
JOIN country
ON (country.country_id = cty.country_id)
WHERE country.country= 'Canada';


SELECT title, COUNT(f.film_id) AS 'frequently_rented'
FROM  film f
JOIN inventory i ON (f.film_id= i.film_id)
JOIN rental r ON (i.inventory_id=r.inventory_id)
GROUP BY title ORDER BY frequently_rented DESC;

SELECT s.store_id, SUM(amount) AS 'Revenue'
FROM payment p
JOIN rental r
ON (p.rental_id = r.rental_id)
JOIN inventory i
ON (i.inventory_id = r.inventory_id)
JOIN store s
ON (s.store_id = i.store_id)
GROUP BY s.store_id; 

SELECT store_id, city, country FROM store s
JOIN address a ON (s.address_id=a.address_id)
JOIN city c ON (a.city_id=c.city_id)
JOIN country cntry ON (c.country_id=cntry.country_id);

SELECT c.name AS 'Genre', SUM(p.amount) AS 'Gross' 
FROM category c
JOIN film_category fc 
ON (c.category_id=fc.category_id)
JOIN inventory i 
ON (fc.film_id=i.film_id)
JOIN rental r 
ON (i.inventory_id=r.inventory_id)
JOIN payment p 
ON (r.rental_id=p.rental_id)
GROUP BY c.name ORDER BY Gross  LIMIT 5;


CREATE VIEW top_five AS
SELECT c.name AS 'Genre', SUM(p.amount) AS 'Gross' 
FROM category c
JOIN film_category fc 
ON (c.category_id=fc.category_id)
JOIN inventory i 
ON (fc.film_id=i.film_id)
JOIN rental r 
ON (i.inventory_id=r.inventory_id)
JOIN payment p 
ON (r.rental_id=p.rental_id)
GROUP BY c.name ORDER BY Gross  LIMIT 5;


SELECT * FROM top_five;

DROP VIEW top_five;
