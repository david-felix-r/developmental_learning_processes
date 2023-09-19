<?php

$post_data = json_decode(file_get_contents('php://input'), true);

// the directory "data" must be writable by the server

//$name = "/research-data/AGReiterExperiments/profile_online/trial/trial".$post_data['filename'].".csv";
$name = "/research-data/AGReiterExperiments/space_data/gamerounds/".$post_data['filename'].".json";
$data = $post_data['filedata'];

// write the file to disk

file_put_contents($name, $data);

?>
