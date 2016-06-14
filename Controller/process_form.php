<?php

//$data['file'] = $_FILES;
//$data['text'] = $_POST;
// echo json_encode($data);
if ($_FILES) {
    $destination = "../images/tshirt/" . $_FILES['image']['name'];
    $source = $_FILES['image']['tmp_name'];
    $upload = move_uploaded_file($source, $destination);
    if (!$upload) {
        echo "ça a échoué";
    } else {
        echo $_FILES["image"]["name"];
        chmod($destination, 0777);
    }
}
?>