 <?php
	header("Access-Control-Allow-Origin: *");
	include("db_connection.php");
	
	if (isset($_POST["submit"])){
		
		
	
	
	 // use prepare statement for insert query
    $st = mysqli_prepare($conn, 'INSERT INTO universitytable(alpha_two_code, country, domain, name, web_page) VALUES (?, ?, ?, ?, ?)');
	 //echo $st;

    // bind variables to insert query params
    mysqli_stmt_bind_param($st, 'sssss', $alpha_two_code, $country, $domain, $name, $web_page);

    // read json file
    //filename = 'records.json';
	 $filename = 'completeRecords.json';
    $json = file_get_contents($filename);   

    //convert json object to php associative array
    $data = json_decode($json, true);
	 //$length = count($data);
	
	 $count = 0;
	
    // loop through the array
    foreach($data as $row){
		
	
			//echo $row['alpha_two_code']."<br>";
			//echo $row['country']."<br>";
			//echo $row['domain']."<br>";
			//echo $row['name']."<br>";
			//echo  $row['web_page']."<br>";
			
        // get the employee details
		  $alpha_two_code = $row['alpha_two_code'];
		  $country = $row['country'];
		  $domain = $row['domain'];
        $name = $row['name'];
		  $name = str_replace("'", "''",$name );
		  $web_page = $row['web_page'];
		  /*)
		  echo $name."<br>";
		  if (strpos($name, '\\') !== FALSE) 
		  { echo "It contains a /"; }
		 */
		 // echo $alpha_two_code."<br>";
		 // echo $country."<br>";
		 // echo $domain."<br>";
		 // echo $name."<br>";
		 // echo $web_page."<br>"."<br>";
		  
        
        // execute insert query
		  /*
        mysqli_stmt_execute($st);
		
		 printf("%d Row inserted.\n", mysqli_stmt_affected_rows($st));
		 echo "<br>";
		  */
		  
		  
		   $query = "INSERT INTO universitytable(alpha_two_code, country, domain, name, web_page) VALUES('$alpha_two_code', '$country', '$domain',
                                                    '{$name}', '$web_page')";
			if (!$qresult = mysqli_query($conn, $query)) {
				echo mysqli_error($conn)."<br>";
				echo $alpha_two_code."<br>";
				echo $country."<br>";
				echo $domain."<br>";
				echo $name."<br>";
				echo $web_page."<br>"."<br>"."<br>";
				//exit(mysqli_error($conn));
			}
			else{
				//echo "row inserted"."<br>";
			  $count++;
			}
			
		 
		  
    }
     printf("%d Rows inserted.\n", ($count));
    //close connection
    mysqli_close($conn);
	
	}
 
 
 ?>