package ganzithon.ganzithon.service.myPage;

import ganzithon.ganzithon.dto.myPage.MyPageDto;
import ganzithon.ganzithon.dto.order.OrderDto;
import ganzithon.ganzithon.dto.user.UserMyPageDto;
import ganzithon.ganzithon.entity.order.Order;
import ganzithon.ganzithon.entity.user.User;
import ganzithon.ganzithon.repository.order.OrderRepository;
import ganzithon.ganzithon.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    public MyPageDto getMyPageInfo(String currentUserEmail) {
        Optional<User> user = userRepository.findByUserEmail(currentUserEmail);
        List<Order> orders = orderRepository.findByUserUserId(user.get().getUserId());

        if (user.isPresent()) {
            MyPageDto myPageDto = new MyPageDto();
            myPageDto.setUserMyPageDto(convertToUserDTO(user.get()));
            myPageDto.setOrders(orders.stream()
                    .map(this::convertToOrderDTO)
                    .collect(Collectors.toList()));
            return myPageDto;
        }

        return null;
    }

    private UserMyPageDto convertToUserDTO(User user) {
        return modelMapper.map(user, UserMyPageDto.class);
    }

    private OrderDto convertToOrderDTO(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }
}
