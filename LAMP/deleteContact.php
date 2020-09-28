<<<<<<< HEAD
<?php
    include 'commons.php';

    // Perform the SQL query to find all users with the username provided
    function perform_delete_query($conn, $user_id, $contact_id) {
        $statement = $conn->prepare("DELETE FROM `contacts` WHERE `user_id`=? AND `contact_id`=?");
        $statement->bind_param("ii", $user_id, $contact_id);
        $statement->execute();
        $rowsAffected = $conn->affected_rows;
        $statement->close();
        return $rowsAffected;
    }

    verify_request_type('DELETE');

    verify_request_field($_GET, 'user_id');
    verify_request_field($_GET, 'contact_id');

    $conn = connect_to_db();
    $rowsAffected = perform_delete_query($conn, $_GET['user_id'], $_GET['contact_id']);
    if ($rowsAffected > 0) {
        send_json_response(STATUS_SUCCESS, (object)array(
            'data' => NULL,
            'result' => 'SUCCESS',
            'error'=> ''
        ));
    } else {
        send_json_response(STATUS_SUCCESS, (object)array(
            'data' => NULL,
            'error'=> 'DOES_NOT_EXIST'
        ));
    }

    $conn->close();
=======
<?php
    include 'commons.php';

    // Perform the SQL query to find all users with the username provided
    function perform_delete_query($conn, $user_id, $contact_id) {
        $statement = $conn->prepare("DELETE FROM `contacts` WHERE `user_id`=? AND `contact_id`=?");
        $statement->bind_param("ii", $user_id, $contact_id);
        $statement->execute();
        $rowsAffected = $conn->affected_rows;
        $statement->close();
        return $rowsAffected;
    }

    verify_request_type('DELETE');

    verify_request_field($_GET, 'user_id');
    verify_request_field($_GET, 'contact_id');

    $conn = connect_to_db();
    $rowsAffected = perform_delete_query($conn, $_GET['user_id'], $_GET['contact_id']);
    if ($rowsAffected > 0) {
        send_json_response(STATUS_SUCCESS, (object)array(
            'data' => NULL,
            'error'=> ''
        ));
    } else {
        send_json_response(STATUS_SUCCESS, (object)array(
            'data' => NULL,
            'error'=> 'DOES_NOT_EXIST'
        ));
    }

    $conn->close();
>>>>>>> 8a975fa278e5df5adbd35e7aeaadbf16e483df53
?>