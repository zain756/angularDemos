<?php

// Connection variables 
$host = "localhost"; // MySQL host name eg. localhost
$user = "root"; // MySQL user. eg. root ( if your on localserver)
$password = ""; // MySQL user password  (if password is not set for your root user then keep it empty )
$database = "patientsdb"; // MySQL Database name

// Connect to MySQL Database 
$conn = mysqli_connect($host, $user, $password,$database) or die("Could not connect to database");

 // Check connection
                if (!$conn) {
                    die("Connection failed: " . mysqli_connect_error());
                }
					 
					 
					 
	/*
	[
    ...
    {
        "alpha_two_code": "TR",
        "country": "Turkey",
        "domain": "sabanciuniv.edu.tr",
        "name": "Sabanci University",
        "web_page": "http://www.sabanciuniv.edu.tr/"
    },
    ...
	]
	
	DROP TABLE IF EXISTS `itemdetails`;
CREATE TABLE IF NOT EXISTS `itemdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_category` varchar(40) NOT NULL,
  `item_number` varchar(40) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `unit_price` varchar(40) NOT NULL,
  `total_quantity` varchar(40) NOT NULL,
  `remaining_quantity` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

	CREATE TABLE IF NOT EXISTS `universityTable` (
	  `id` int(8) NOT NULL AUTO_INCREMENT,
	  `country` varchar(30) NOT NULL,
	  `domain` varchar(30) NOT NULL,
	  `name` varchar(50) NOT NULL,
	  `alpha_two_code` varchar(10) NOT NULL,
	  `web_page` varchar(10) NOT NULL,
	  
	  PRIMARY KEY (`id`)
	);

*/				 
?>

