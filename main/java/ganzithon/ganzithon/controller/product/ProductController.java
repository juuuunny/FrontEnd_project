package ganzithon.ganzithon.controller.product;


import ganzithon.ganzithon.dto.product.ProductDetailDto;
import ganzithon.ganzithon.dto.product.ProductDto;
import ganzithon.ganzithon.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shop")
public class ProductController {

    private final ProductService productService;
    @GetMapping
    public ResponseEntity<List<ProductDto>> getProductsByArea(@RequestParam("area") String area) {
        List<ProductDto> productDto = productService.getProductsByArea(area);
        if (productDto.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(productDto);
    }

    // 상품 ID를 받아서 상품 정보를 반환하는 메소드
    @GetMapping("/{productId}")
    public ResponseEntity<ProductDetailDto> getProduct(@PathVariable Long productId) {
        ProductDetailDto productDetailDto = productService.productDetail(productId);

        if (productDetailDto != null) {
            return ResponseEntity.ok(productDetailDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
