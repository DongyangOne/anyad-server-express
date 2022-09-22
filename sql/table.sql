-- Create Table User
create table tbl_user(
  id int not null auto_increment primary key,
  email varchar(255) not null,
  pw varchar(255) not null,
  reg_date datetime DEFAULT CURRENT_TIMESTAMP,
  mod_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- Create Table Module
create table tbl_module(
  id int not null auto_increment primary key,
  user_id int not null,
  name varchar(255) not null,
  reg_date datetime DEFAULT CURRENT_TIMESTAMP,
  mod_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_user (id)
)

-- Create Table Access
create table tbl_access(
  id int not null auto_increment primary key,
  user_id int not null,
  module_id int not null,
  name varchar(255) not null,
  reg_date datetime DEFAULT CURRENT_TIMESTAMP,
  mod_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_user (id),
  FOREIGN KEY (module_id) REFERENCES tbl_module (id)
)

-- Create Table Board
create table tbl_board(
  id int not null auto_increment primary key,
  user_id int not null,
  module_id int not null,
  title varchar(255) not null,
  content TEXT not null,
  price int not null,
  reg_date datetime DEFAULT CURRENT_TIMESTAMP,
  mod_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_user (id),
  FOREIGN KEY (module_id) REFERENCES tbl_module (id)
)

-- Create Table Video
create table tbl_video(
  id int not null auto_increment primary key,
  user_id int not null,
  access_id int not null,
  path varchar(255) not null,
  reg_date datetime DEFAULT CURRENT_TIMESTAMP,
  mod_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_user (id),
  FOREIGN KEY (access_id) REFERENCES tbl_access (id)
)



