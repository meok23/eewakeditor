<?php
header("Content-type: text/html; charset=utf-8");

// echo json_encode($_FILES);

echo json_encode(array(
    'code' => 0,
    'msg'  => 'zxc',
    'data' => array(
        'src'   => 'http://www',
        'title' => 'qwe',
    ),
));
