<?php
  include 'commons.php';

  verify_request_type('GET');

  verify_request_field($_GET, "user_id");

  $conn = connect_to_db();
  
  $user_id = $_GET["user_id"];
  
  $sql = "SELECT `contact_id`, `first_name`, `last_name`, `email`, `phone_number`, `created_at` FROM `contacts` WHERE `user_id`=" . $user_id;

  $result = $conn->query($sql);
  if($result == FALSE) {
    send_json_response($STATUS_SUCCESS, (object)array(
      'data' => NULL,
      'error' => 'ERROR',
    ));
    return;
  }

  $results = $result->fetch_all(MYSQLI_ASSOC);
  send_json_response($STATUS_SUCCESS, (object)array(
      'data' => $results,
      'error' => '',
  ));
?>
