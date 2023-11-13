package ganzithon.ganzithon.repository.order;
import ganzithon.ganzithon.entity.order.Order;
import ganzithon.ganzithon.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Long> {

    // 사용자 ID를 기반으로 모든 주문 찾기
    List<Order> findByUserUserId(Long userId);
}