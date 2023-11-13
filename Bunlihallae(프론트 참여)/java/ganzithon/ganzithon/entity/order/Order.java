package ganzithon.ganzithon.entity.order;

import ganzithon.ganzithon.entity.product.Product;
import ganzithon.ganzithon.entity.user.User;
import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="order_table")
public class Order { // dd
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Order(User user, Product product) {
        this.user = user;
        this.product = product;
    }
}
