<?php

//Include libraries
require __DIR__ . '/vendor/autoload.php';
    
//Create instance of MongoDB client
$mongoClient = (new MongoDB\Client);

//Select a database
$db = $mongoClient->arn;

//Select a collection 
$collection = $db->Products;

//Extract the data that was sent to the server
$name= filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$brand = filter_input(INPUT_POST, 'brand', FILTER_SANITIZE_STRING);
$price = filter_input(INPUT_POST, 'price', FILTER_SANITIZE_STRING);
$size = filter_input(INPUT_POST, 'size', FILTER_SANITIZE_STRING);
$colour = filter_input(INPUT_POST, 'colour', FILTER_SANITIZE_STRING);
$material = filter_input(INPUT_POST, 'material', FILTER_SANITIZE_STRING);
$quantity = filter_input(INPUT_POST, 'quantity', FILTER_SANITIZE_STRING);
$description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);
$uploadFileName = $_FILES["image-input"]["name"];
$uploadFileName1 = $_FILES["image-input-1"]["name"];
$uploadFileName2 = $_FILES["image-input-2"]["name"];
$uploadFileName3 = $_FILES["image-input-3"]["name"];
$uploadFileName4 = $_FILES["image-input-4"]["name"];
//Convert to PHP array
$target_file = '../Images/Products/' . $uploadFileName;
$target_file1 = '../Images/Products/' . $uploadFileName1;
$target_file2 = '../Images/Products/' . $uploadFileName2;
$target_file3 = '../Images/Products/' . $uploadFileName3;
$target_file4 = '../Images/Products/' .  $uploadFileName4;
$dataArray = [
    "name" => $name, 
    "brand" => $brand, 
    "price" => $price,
    "size" => $size, 
    "colour" => $colour,
    "material" => $material,
    "quantity" => $quantity,
    "description" => $description,
    "image" => $target_file,
    "image1" => $target_file1,
    "image2" => $target_file2,
    "image3" => $target_file3,
    "image4" => $target_file4

 ];
//Add the new product to the database
$insertResult = $collection->insertOne($dataArray);
move_uploaded_file($_FILES["image-input"]["tmp_name"], $target_file);
move_uploaded_file($_FILES["image-input-1"]["tmp_name"], $target_file1);
move_uploaded_file($_FILES["image-input-2"]["tmp_name"], $target_file2);
move_uploaded_file($_FILES["image-input-3"]["tmp_name"], $target_file3);
move_uploaded_file($_FILES["image-input-4"]["tmp_name"], $target_file4);
//Echo result back to user
if($insertResult->getInsertedCount()==1){
    echo 'Product added.';
    echo ' New document id: ' . $insertResult->getInsertedId();
}
else {
    echo 'Error adding customer';
}







