create database authentication;
use authentication;
create table userData(id int not null auto_increment, username varchar(50),email varchar(100),upassword varchar(200), primary key(id));