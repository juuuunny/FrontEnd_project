package ganzithon.ganzithon.dto.product;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductDetailDto {
    private Integer productId;
    private String productName;
    private Integer productPrice;
    private String productImg;
    private String productDetail;
}
