package com.example.ecommerce.dto;

import java.util.List;

public record OrderRequest(
        String customerName,
        String email,
        String phone,
        String address,
        String city,
        String postalCode,
        List<Item> items) {

    public record Item(Long productId, Integer quantity) {
    }
}
