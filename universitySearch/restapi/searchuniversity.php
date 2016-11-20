<?php
// include Database connection file
// Connection variables 
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
/*
$host = "mysql6.000webhost.com"; // MySQL host name eg. localhost
$user = "a4130694_user"; // MySQL user. eg. root ( if your on localserver)
$password = "nokiax101"; // MySQL user password  (if password is not set for your root user then keep it empty )
$database = "a4130694_db"; // MySQL Database name
*/
//use for testeing on localhost
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

// check request
$method = $_SERVER['REQUEST_METHOD'];
 $response = array();
//echo $method;
//echo "test";

if (isset ($_GET['name']) || isset ($_GET['country'])|| isset ($_GET['domain'])
       || isset ($_GET['alpha_two_code'])|| isset ($_GET['web_page'])){
   
    $response['message'] = "testing";
    $response['method'] = $method;

    $country = $name = $domain = $alpha_two_code = $web_page = "%";

    if (isset ($_GET['country'])){ 
        $country = $_GET['country'];
        $country.='%';
    }
    if (isset ($_GET['name'])){
        $name = $_GET['name'];
        $name.='%';
    }
    if (isset ($_GET['domain'])){
        $domain = $_GET['domain'];
        $domain.= '%';
    }
    if (isset ($_GET['alpha_two_code'])){
        $alpha_two_code = $_GET['alpha_two_code'];
        $alpha_two_code .='%';
    }
    if (isset ($_GET['web_page'])){
        $web_page = $_GET['web_page'];
        $web_page .='%';
    }

    
    
    /*$name .='%';
    $domain .='%';
    $alpha_two_code .='%';
    $web_page .='%';
    */

    //echo json_encode($response);
	 
	 $queryCount = "SELECT count(*) as count FROM universitytable WHERE country like '$country' and domain like '$domain' 
               and name like '$name' and alpha_two_code like '$alpha_two_code' and web_page like '$web_page' limit 20"  ;
					
	 if (!$result = mysqli_query($conn, $queryCount)) {
        exit(mysqli_error($conn));
    }
	 if(mysqli_num_rows($result) > 0) {
		 while ($row = mysqli_fetch_assoc($result)) {
			$response["count"] = $row;
		 }
	 }
	 json_encode($response);
	 
    $query = "SELECT * FROM universitytable WHERE country like '$country' and domain like '$domain' 
               and name like '$name' and alpha_two_code like '$alpha_two_code' and web_page like '$web_page' limit 100"  ;




    if (!$result = mysqli_query($conn, $query)) {
        exit(mysqli_error($conn));
    }    

    if(mysqli_num_rows($result) > 0) {
        $response['message'] = "records found!";
        while ($row = mysqli_fetch_assoc($result)) {
           // $response[] =  array('data' => $row);
             $response['results'][] =  $row;
        }
       
    }
    else
    {
        $response['status'] = 200;
        $response['message'] = "no record found!";
        
    }
    // display JSON data
     echo json_encode($response);    
        

}
else{
    $response['message'] = "no record found!";

    echo json_encode($response);  
}
?>