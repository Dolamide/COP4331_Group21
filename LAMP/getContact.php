<?php
  include 'commons.php';
  verify_request_type('GET');

  verify_request_field($_GET, "user_id");
  verify_request_field($_GET, "contact_id");

  $indata = decode_JSON_request();

  $user_id = $_GET["user_id"];
  $contact_id = $_GET["contact_id"];

  $conn = connect_to_db();

  $sql = create_sql_query($user_id, $contact_id);

  $result = $conn->query($sql);
  if($result->num_rows > 0) {
    $results = $result->fetch_all(MYSQLI_ASSOC);
    send_json_response($STATUS_SUCCESS, (object)array(
        'data' => $results,
        'error' => '',
    ));
  } else {
    send_json_response($STATUS_SUCCESS, (object)array(
        'data' => NULL,
        'error' => 'NO RESULTS',
    ));
  }

  ///////////////////////////
  // Function Declarations //
  ///////////////////////////

  // formulates the sql search query
  function create_sql_query($user_id, $contact_id) {
    $sql = "SELECT `contact_id`, `user_id`, `first_name`, `last_name`, `email`, `phone_number`, `created_at` FROM `contacts` WHERE ";
    $sql .= "user_id = " . $user_id . " and ";
    $sql .= "contact_id = " . $contact_id . "";
    return $sql;
  }

?>
