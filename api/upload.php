<?php
$output = [];

if (isset($_FILES['images'])) {
    $images = $_FILES['images'];
    foreach ($images['tmp_name'] as $key => $tmp_name) {
        $name = $images['name'][$key];
        $size = $images['size'][$key];
        $type = $images['type'][$key];
        $error = $images['error'][$key];

        if ($error !== UPLOAD_ERR_OK) {
            $output[] = "Error uploading file: $name";
            continue;
        }

        // Check file type
        $allowedTypes = ['image/png', 'image/jpeg'];
        if (!in_array($type, $allowedTypes)) {
            $output[] = "Invalid file type: $name";
            continue;
        }

        // Check file size
        if ($size > 5 * 1024 * 1024) {
            $output[] = "File size exceeds 5MB limit: $name";
            continue;
        }

        // Convert image to webp
        $webpName = pathinfo($name, PATHINFO_FILENAME) . '.webp';
        $webpPath = 'converted/' . $webpName;
        if (!move_uploaded_file($tmp_name, $webpPath)) {
            $output[] = "Error converting file to webp: $name";
            continue;
        }

        $output[] = $webpPath;
    }
}

header('Content-Type: application/json');
echo json_encode($output);
?>
