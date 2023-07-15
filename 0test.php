<!DOCTYPE html>
<html>
<head>
	<title>Trang chào mừng sử dụng PHP</title>
</head>
<body>
	<h1>Chào mừng đến với trang của chúng tôi!</h1>
	<?php
		// Lấy tên người dùng từ URL
		$name = $_GET['name'];
		if ($name) {
			echo "<p>Xin chào, $name!</p>";
		} else {
			echo "<p>Vui lòng nhập tên của bạn vào URL.</p>";
		}
	?>
</body>
</html>