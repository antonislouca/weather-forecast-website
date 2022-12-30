<?php
// echo "post message to DB ";
$dbserver="dbserver.in.cs.ucy.ac.cy";
$dbusername="student";
$dbpassword="gtNgMF8pZyZq6l53";
$dbname="epl425";

if(!isset($_GET["username"])){ // get username from request
    http_response_code(400);
    // echo '400 Bad Request';
    return;
} 

$connection=mysqli_connect($dbserver, $dbusername, $dbpassword,$dbname) or die("Could not connect: " . mysqli_error($connection)); 


$username=($_GET['username']);

$query="SELECT timestamp,address,region,city FROM requests where username='$username'  ORDER BY timestamp DESC LIMIT 5";

// print_r($query);
$result=mysqli_query($connection, $query);
$num_of_rows = mysqli_num_rows($result);

if ($num_of_rows>0) { //something was returned

    // echo "200 OK\n";
    $pld_arr=array();
    http_response_code(200);
    for ($i=0; $i<$num_of_rows; $i++) { 
        $row=mysqli_fetch_row($result);
        
        $temparr = array('timestamp' => $row[0],'address' => $row[1],'region' => $row[2],'city' => $row[3] );
        // print_r($temparr);
        array_push($pld_arr,$temparr);
    }
    
    // print_r($pld_arr);
    $json_str=json_encode($pld_arr);
    echo $json_str;

} else {
    // echo "500 Server Error";
    http_response_code(500);

}

mysqli_close($connection);

?>