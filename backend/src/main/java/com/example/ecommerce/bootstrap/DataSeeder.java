package com.example.ecommerce.bootstrap;

import com.example.ecommerce.model.Category;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }

        Category electronics = categoryRepository.save(new Category("Electronics"));
        Category fashion = categoryRepository.save(new Category("Fashion"));
        Category books = categoryRepository.save(new Category("Books"));
        Category home = categoryRepository.save(new Category("Home & Kitchen"));
        Category sports = categoryRepository.save(new Category("Sports"));

        List<Product> products = List.of(
                product("Wireless Headphones", "Over-ear Bluetooth headphones with 30h battery life and deep bass.",
                        "59.99", 25, electronics, "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp"),
                product("Smart Watch", "Fitness tracking, heart rate sensor and 7-day battery in a slim body.",
                        "129.99", 15, electronics, "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp"),
                product("Bluetooth Speaker", "Portable wireless speaker with surprisingly loud stereo sound.",
                        "39.99", 30, electronics, "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp"),
                product("USB-C Fast Charger", "30W fast charger that powers up your phone in under an hour.",
                        "19.99", 50, electronics, "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp"),
                product("Wireless Earbuds", "Truly wireless earbuds with a pocket charging case and punchy bass.",
                        "24.99", 40, electronics, "https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp"),
                product("Cotton T-Shirt", "100% combed cotton tee, pre-shrunk and breathable for daily wear.",
                        "14.99", 60, fashion, "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp"),
                product("Blue Check Shirt", "Casual cotton check shirt with a regular fit and soft finish.",
                        "34.99", 20, fashion, "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp"),
                product("Sports Sneakers", "Lightweight sneakers with a cushioned sole for all-day comfort.",
                        "59.99", 18, fashion, "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/thumbnail.webp"),
                product("Clean Code", "Robert C. Martin's classic guide on writing maintainable software.",
                        "32.99", 12, books, "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"),
                product("Atomic Habits", "James Clear's bestselling book on building good habits step by step.",
                        "18.99", 35, books, "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"),
                product("Introduction to Algorithms", "The definitive algorithms textbook, CLRS fourth edition.",
                        "45.99", 10, books, "https://covers.openlibrary.org/b/isbn/9780262046305-L.jpg"),
                product("Steel Lunch Box", "Leak-proof stainless steel lunch box that keeps food fresh for hours.",
                        "15.99", 45, home, "https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/thumbnail.webp"),
                product("Mug Set with Stand", "Six ceramic mugs on a tree stand, ready for the kitchen shelf.",
                        "21.99", 22, home, "https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp"),
                product("Table Lamp", "Warm ambient table lamp for your study desk or bedside.",
                        "27.99", 16, home, "https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp"),
                product("Cricket Bat", "Kashmir willow cricket bat with grip tape and a head cover.",
                        "39.99", 28, sports, "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp"),
                product("Football", "Size 5 stitched football suitable for grass and turf.",
                        "22.99", 14, sports, "https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp"),
                product("Tennis Racket", "Lightweight tennis racket with grip tape and a head cover.",
                        "34.99", 12, sports, "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp")
        );

        productRepository.saveAll(products);
    }

    private Product product(String name, String description, String price, int stock, Category category, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(new BigDecimal(price));
        product.setStock(stock);
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        return product;
    }
}
