package ganzithon.ganzithon.repository.user;

import ganzithon.ganzithon.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String userEmail);
    List<User> findByGameDisabledDurationGreaterThan(int duration);

}