FROM mysql:8

WORKDIR /home/

EXPOSE 3306
#ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'bd'