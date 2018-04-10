CREATE DATABASE genboard;
CREATE USER 'genboarduser' IDENTIFIED BY '159gb753';
GRANT ALL ON genboard.* TO 'genboarduser';
FLUSH PRIVILEGES;

use genboard;
