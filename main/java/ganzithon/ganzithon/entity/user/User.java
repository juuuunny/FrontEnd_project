package ganzithon.ganzithon.entity.user;
import ganzithon.ganzithon.entity.order.Order;
import lombok.*;
import org.springframework.context.annotation.Profile;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId; // 유저 고유 식별자

    @Column(nullable = false, length = 50)
    private String userName; // 유저 이름

    @Column(nullable = false, unique = true, length = 100)
    private String userEmail; // 유저 이메일

    @Column(nullable = false, length = 100)
    private String userPassword; // 유저 비밀번호

    @Column(nullable = false, length = 200)
    private String userAddress; // 유저 주소

    @Column(nullable = false)
    private Integer userMileage; // 유저 마일리지

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;
    private Integer gameDisabledDuration = 0; // 게임 불가능 지속 시간 (분 단위)
}
