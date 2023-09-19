<?php

$post_data = json_decode(file_get_contents('php://input'), true);

// the directory "data" must be writable by the server

//to have the permission to write data all boxes must be ticked, should work now
$name = "/research-data/AGReiterExperiments/space_data/".$post_data['filename'].".json";

//$name = "/var/www/kjppp-onlineresearch.ukw.de/AGReiter/germanAversive/".$post_data['filename'].".json";

$data = $post_data['filedata'];

// write the file to disk

file_put_contents($name, $data);

?>