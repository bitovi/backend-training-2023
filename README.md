# Backend Department Training 2023

list products:

```
curl http://localhost:3002/products | jq
```

create a cart:

```
curl -X POST http://localhost:3000/cart | jq
```

add a product to a cart:

```
curl -X POST -H 'Content-type: application/json' http://localhost:3000/cart/add -d '{"cartId": "<cart id>", "productId": "<product id>", "quantity": 1}'
```
