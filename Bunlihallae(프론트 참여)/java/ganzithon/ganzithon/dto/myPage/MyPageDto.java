package ganzithon.ganzithon.dto.myPage;


import ganzithon.ganzithon.dto.order.OrderDto;
import ganzithon.ganzithon.dto.user.UserMyPageDto;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MyPageDto {
    private UserMyPageDto userMyPageDto;
    private List<OrderDto> orders;
}

