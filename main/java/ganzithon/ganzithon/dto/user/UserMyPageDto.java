package ganzithon.ganzithon.dto.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserMyPageDto {
    private Long userId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private Integer userMileage;
    private Integer gameDisabledDuration; // 게임 불가능 지속 시간 (분 단위)
}
