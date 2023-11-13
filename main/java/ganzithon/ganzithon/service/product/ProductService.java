package ganzithon.ganzithon.service.product;

import ganzithon.ganzithon.dto.product.ProductDetailDto;
import ganzithon.ganzithon.dto.product.ProductDto;
import ganzithon.ganzithon.entity.product.Product;
import ganzithon.ganzithon.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    public List<ProductDto> getProductsByArea(String area) {
        List<Product> products = productRepository.findByProductArea(area);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private ProductDto convertToDto(Product product) {
        return modelMapper.map(product, ProductDto.class);
    }
    private ProductDetailDto convertToDetailDto(Product product) {
        return modelMapper.map(product, ProductDetailDto.class);
    }

    public ProductDetailDto productDetail(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        return product.map(this::convertToDetailDto).orElse(null);
    }
}