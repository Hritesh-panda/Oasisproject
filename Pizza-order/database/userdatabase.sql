 create database pizaApp;
 use pizaApp;
 create table userData(id int not null auto_increment, usrname varchar(100),usrEmail varchar(250),usrPassword varchar(100),usrMobile varchar(100), primary key(id));
 select * from userData;