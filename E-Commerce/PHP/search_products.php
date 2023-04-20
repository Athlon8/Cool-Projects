<?php

//Include libraries
require __DIR__ . '/vendor/autoload.php';
    
//Create instance of MongoDB client
$mongoClient = (new MongoDB\Client);
//Select a database
$db = $mongoClient->arn;

//Select a collection 
$collection = $db->Products;
$searchInput = $_GET["search"];
$cursor = $collection->find([
	'$or' => [
		['name' => ['$regex' => $searchInput, '$options' => 'i']],
		['description' => ['$regex' => $searchInput, '$options' => 'i']]
	]
]);
//Encode cursor data to JSON format
$data = [];
foreach ($cursor as $document) {
    $document['_id'] = (string) $document['_id']; //convert _id to string
    $data[] = $document;
}
$jsonCursor = json_encode($data);
// Return JSON response
header('Content-Type: application/json');
echo $jsonCursor;