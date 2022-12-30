<?php

// echo "post message to DB ";
$dbserver="dbserver.in.cs.ucy.ac.cy";
$dbusername="student";
$dbpassword="gtNgMF8pZyZq6l53";
$dbname="epl425";
//check for empty body in post message 

$content_type="";
if (isset($_SERVER['CONTENT_TYPE'])) { //if content type is set get content type
    $content_type=$_SERVER['CONTENT_TYPE'];
    // print_r($content_type);
}

if (strcmp($content_type,"application/json")==0) { //check that request is in application/json format
    // check for invalid json stirng 
    //if any of the above reply with  $400 Bad request
   $json_str=trim(file_get_contents("php://input")); //get json string input
   $data_sent= json_decode($json_str);//get data from json 

//    print_r ($data_sent);

   if (count((array)$data_sent)==0) { //empty body
    //    echo "400 Bad Request";
       http_response_code(400);
       return;
    } 

    $connection=mysqli_connect($dbserver, $dbusername, $dbpassword,$dbname) or die("Could not connect: " . mysqli_error($connection)); 
    $timestamp=time(); //get time
    
    $address=$data_sent->address;
    $region=$data_sent->region;
    $city=$data_sent->city;
    $user_name=$data_sent->username;
    $country="Cyprus";
    // $country=$data_sent->country;
    $query = "INSERT INTO epl425.requests (username,timestamp,address,region,city,country) VALUES ('$user_name', '$timestamp','$address','$region','$city','$country')"; 
    // print_r($query);
    $result=mysqli_query($connection, $query); 

    // print_r( mysqli_error($connection));
    if ($result) {
        // echo "201 Created";
        http_response_code(201);
    }else {
        // echo "500 Server Error";
        http_response_code(500);
    }
    mysqli_close($connection);

}else {
    http_response_code(400);
    echo "Content type is not application/json format";
    return;
}



?>