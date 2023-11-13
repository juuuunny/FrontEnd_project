package ganzithon.ganzithon.dto.order;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderDto {
    private Long orderId;
    private Long userId;
    private Long productId;
    private Integer productPrice;
    private String productImg;
}