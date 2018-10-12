SELECT *
FROM posts
WHERE title LIKE '%' || $1 || '%' AND WHERE user_id != $2