<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f4f4f4;
        }
        .container {
            width: 80%;
            max-width: 800px;
            background: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            border-radius: 8px;
        }
        .product {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }
        .product:last-child {
            border-bottom: none;
        }
        .product-name {
            font-weight: bold;
        }
        .product-price {
            color: green;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Product List</h2>
        <?php
        $products = [
            ["name" => "Laptop", "price" => 1000],
            ["name" => "Smartphone", "price" => 500],
            ["name" => "Tablet", "price" => 300],
            ["name" => "Headphones", "price" => 100],
        ];

        foreach ($products as $product) {
            echo "<div class='product'>";
            echo "<span class='product-name'>" . $product['name'] . "</span>";
            echo "<span class='product-price'>$" . $product['price'] . "</span>";
            echo "</div>";
        }
        ?>
    </div>
</body>
</html>