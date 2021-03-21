<?php
session_start();
session_destroy();



echo json_encode("OK");
http_response_code(200);

?>