<?php
  include 'commons.php';

  verify_request_type('GET');

  verify_request_field($_GET, "user_id");
  verify_request_field($_GET, "search_data");

  $user_id = $_GET["user_id"];
  $search_data = $_GET["search_data"];

  $conn = connect_to_db();

  $sql = create_sql_query($user_id, $search_data);

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
        'error' => 'No results matching',
    ));
  }

  ///////////////////////////
  // Function Declarations //
  ///////////////////////////

  // formulates the sql search query
  function create_sql_query($user_id, $search_data) {
    $sql = "SELECT `contact_id`, `user_id`, `first_name`, `last_name`, `email`, `phone_number`, `created_at` FROM `contacts` WHERE ";
    $sql .= "user_id = " . $user_id . " and (" ;
    $sql .= "first_name like '%" . $search_data . "%' or ";
    $sql .= "last_name like '%" . $search_data . "%' or ";
    $sql .= "email like '%" . $search_data . "%' or ";
    $sql .= "phone_number like '%" . $search_data . "%')";
    return $sql;
  }

?>
