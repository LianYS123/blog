
CREATE TABLE `user` (
`id` int( 11 ) NOT NULL AUTO_INCREMENT ,
`username` varchar( 200 ) default NULL ,
`password` varchar( 200 ) default NULL ,
`status` int( 4 ) default NULL ,
PRIMARY KEY ( `id` )
)