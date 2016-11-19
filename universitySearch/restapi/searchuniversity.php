<?php
// include Database connection file
// Connection variables 
$host = "localhost"; // MySQL host name eg. localhost
$user = "root"; // MySQL user. eg. root ( if your on localserver)
$password = "zain"; // MySQL user password  (if password is not set for your root user then keep it empty )
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
    
    $query = "SELECT * FROM universitytable WHERE country like '$country' and domain like '$domain' 
               and name like '$name' and alpha_two_code like '$alpha_two_code' and web_page like '$web_page' limit 20"  ;
               /*
    if (isset ($_GET['country']) && isset ($_GET['name']) && isset ($_GET['domain']) && isset ($_GET['web_page'])
        && isset ($_GET['alpha_two_code'])){

        $query = "SELECT * FROM universitytable WHERE country like '$country' and domain like '$domain' 
               and name like '$name' and alpha_two_code like '$alpha_two_code' and web_page like '$web_page' limit 10"  ;
    else if (!isset ($_GET['country']) && isset ($_GET['name']) && !isset ($_GET['domain']) && !isset ($_GET['web_page'])
        && !isset ($_GET['alpha_two_code'])){

        $query = "SELECT * FROM universitytable WHERE name like '$name' LIMIT 10"  ; 
    }
    else if (!isset ($_GET['country']) && !isset ($_GET['name']) && isset ($_GET['domain']) && !isset ($_GET['web_page'])
        && !isset ($_GET['alpha_two_code'])){

        $query = "SELECT * FROM universitytable WHERE domain like '$domain' LIMIT 10"  ; 
    }
    else if (!isset ($_GET['country']) && !isset ($_GET['name']) && !isset ($_GET['domain']) && isset ($_GET['web_page'])
        && !isset ($_GET['alpha_two_code'])){

        $query = "SELECT * FROM universitytable WHERE web_page like '$web_page' LIMIT 10"  ; 
    }
    else if (!isset ($_GET['country']) && !isset ($_GET['name']) && !isset ($_GET['domain']) && !isset ($_GET['web_page'])
        && isset ($_GET['alpha_two_code'])){

        $query = "SELECT * FROM universitytable WHERE alpha_two_code like '$alpha_two_code' LIMIT 10"  ; 
    }
    else{
        $query = "SELECT * FROM universitytable WHERE country like 'U' LIMIT 10"  ; 
    }
    */




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