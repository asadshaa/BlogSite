use blog_site;

CREATE TABLE UsersTable (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE BlogPosts (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(50) NOT NULL,
    Content TEXT NOT NULL,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES UsersTable(Id)
);


CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_text TEXT NOT NULL,
    post_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES BlogPosts(id),
    FOREIGN KEY (user_id) REFERENCES UserTable(Id)
);
drop table posts;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE posts;

SET FOREIGN_KEY_CHECKS = 1;
rename table blogposts to posts;
describe posts;
show create table posts;
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES userstable(id) ON DELETE CASCADE
);