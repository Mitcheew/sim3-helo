SELECT posts.title, posts.image, posts.content, users.username, users.profile_pic
FROM posts, users
WHERE posts.post_id = $1 AND posts.user_id = users.user_id
