package ganzithon.ganzithon.service.game;

import ganzithon.ganzithon.dto.game.GameDto;
import ganzithon.ganzithon.entity.user.User;
import ganzithon.ganzithon.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {
    private final UserRepository userRepository;

    public String setGameData(GameDto gameDto, String currentUserEmail) {
        Optional<User> user = userRepository.findByUserEmail(currentUserEmail);

        if (user.isPresent()) {
            Integer userMileage = user.get().getUserMileage() + gameDto.getUserMileage();
            boolean gameAvailable = false;
            int gameDisabledDuration = 5; // 원래는 24시간으로 해야함.

            user.get().setUserMileage(userMileage);
            user.get().setGameDisabledDuration(gameDisabledDuration);

            userRepository.save(user.get());

            return "success";
        }

        return "error";
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void decrementGameDisabledDuration() {
        List<User> users = userRepository.findByGameDisabledDurationGreaterThan(0);
        for (User user : users) {
            int newDuration = user.getGameDisabledDuration() - 1;
            user.setGameDisabledDuration(Math.max(newDuration, 0));
        }
    }
}
