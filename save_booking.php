<?php
$host = "localhost"; // database host
$user = "root";      // database username
$pass = "";          // database password
$dbname = "futsal_rental"; // database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed."]));
}

// Get form data
$courtName = $_POST['courtName'] ?? '';
$bookingDate = $_POST['bookingDate'] ?? '';
$bookingTime = $_POST['bookingTime'] ?? '';
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';

if ($courtName && $bookingDate && $bookingTime && $name && $phone) {
    $stmt = $conn->prepare("INSERT INTO bookings (court_name, booking_date, booking_time, full_name, phone) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $courtName, $bookingDate, $bookingTime, $name, $phone);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Booking saved successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save booking."]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Missing form data."]);
}

$conn->close();
?>
