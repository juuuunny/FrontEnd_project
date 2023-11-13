package ganzithon.ganzithon.controller.order;
import ganzithon.ganzithon.service.auth.AuthenticationService;
import ganzithon.ganzithon.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shop")
public class OrderController {
    private final OrderService orderService;
    private final AuthenticationService authenticationService;

    @PostMapping("/{productId}")
    public ResponseEntity<String> order(@PathVariable Long productId) {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        String orderResult = orderService.order(productId, currentUserEmail);

        if (Objects.equals(orderResult, "success"))
        {
            return ResponseEntity.ok("상품이 주문 되었습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
