package com.example.ecommerce.service;

import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order placeOrder(OrderRequest request) {
        if (request.items() == null || request.items().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Your cart is empty.");
        }
        if (isBlank(request.customerName()) || isBlank(request.address())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name and address are required.");
        }

        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setCustomerName(request.customerName());
        order.setEmail(request.email());
        order.setPhone(request.phone());
        order.setAddress(request.address());
        order.setCity(request.city());
        order.setPostalCode(request.postalCode());
        order.setStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;
        List<Product> purchased = new ArrayList<>();

        for (OrderRequest.Item item : request.items()) {
            Product product = productRepository.findById(item.productId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Product not found: " + item.productId()));
            int quantity = item.quantity() == null ? 0 : item.quantity();
            if (quantity < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid quantity for " + product.getName());
            }
            if (product.getStock() < quantity) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Not enough stock for " + product.getName() + " (only " + product.getStock() + " left).");
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setProductName(product.getName());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setQuantity(quantity);
            order.addItem(orderItem);

            product.setStock(product.getStock() - quantity);
            purchased.add(product);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        }

        order.setTotal(total);
        productRepository.saveAll(purchased);
        return orderRepository.save(order);
    }

    public Order trackOrder(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No order found with number " + orderNumber));
        order.setStatus(currentStatus(order.getCreatedAt()));
        return orderRepository.save(order);
    }

    // there is no admin panel, so status is simulated from time since the order was placed
    private String currentStatus(LocalDateTime createdAt) {
        long minutes = Duration.between(createdAt, LocalDateTime.now()).toMinutes();
        if (minutes >= 6) return "DELIVERED";
        if (minutes >= 3) return "SHIPPED";
        if (minutes >= 1) return "PROCESSING";
        return "PLACED";
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private String generateOrderNumber() {
        String timePart = Long.toString(System.currentTimeMillis(), 36).toUpperCase();
        String randomPart = String.format("%04d", ThreadLocalRandom.current().nextInt(10000));
        return "ORD-" + timePart + "-" + randomPart;
    }
}
