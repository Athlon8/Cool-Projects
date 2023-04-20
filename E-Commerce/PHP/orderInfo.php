<?php

//Include libraries
require __DIR__ . '/vendor/autoload.php';
    
//Create instance of MongoDB client
$mongoClient = (new MongoDB\Client);
//Select a database
$db = $mongoClient->arn;

//Select a collection 
$collection = $db->Orders;

//Extract ID from POST data

$orderID = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);

//Build PHP array with delete criteria 
$findCriteria = [
    "_id" => new MongoDB\BSON\ObjectID($orderID)
];

//Delete the customer document
$found = $collection->findOne($findCriteria);
$found['_id'] = (string) $found['_id'];
$jsonFound = json_encode($found);
echo $jsonFound;
//Echo result back to user


