package ganzithon.ganzithon.service.order;

import ganzithon.ganzithon.entity.order.Order;
import ganzithon.ganzithon.entity.product.Product;
import ganzithon.ganzithon.entity.user.User;
import ganzithon.ganzithon.repository.order.OrderRepository;
import ganzithon.ganzithon.repository.product.ProductRepository;
import ganzithon.ganzithon.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public String order(Long productId, String currentUserEmail) {
        Optional<User> userOptional = userRepository.findByUserEmail(currentUserEmail);
        if (!userOptional.isPresent()) {
            return "error: user not found";
        }
        Optional<Product> productOptional = productRepository.findById(productId);
        if (!productOptional.isPresent()) {
            return "error: product not found";
        }
        Integer userMileage = userOptional.get().getUserMileage();
        Integer productPrice = productOptional.get().getProductPrice();

        System.out.println("userMileage: "+userMileage);
        System.out.println("productPrice: "+productPrice);

        if (userMileage < productPrice) {
            return "error: no Mileage";
        }


        User user = userOptional.get();
        Product product = productOptional.get();

        // 새로운 주문 객체를 만들어서
        Order newOrder = new Order(user , product);

        // 주문을 저장합니다.
        orderRepository.save(newOrder);
        Integer currentMileage = userMileage - productPrice;
        user.setUserMileage(currentMileage);
        userRepository.save(user);

        return "success";
    }
}
