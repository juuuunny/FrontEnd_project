package ganzithon.ganzithon.controller.game;

import ganzithon.ganzithon.dto.game.GameDto;
import ganzithon.ganzithon.dto.token.TokenDto;
import ganzithon.ganzithon.dto.user.UserDto;
import ganzithon.ganzithon.service.auth.AuthenticationService;
import ganzithon.ganzithon.service.game.GameService;
import ganzithon.ganzithon.service.token.TokenService;
import ganzithon.ganzithon.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
public class GameController {
    private final GameService gameService;
    private final AuthenticationService authenticationService;
    @PostMapping("/finish")
    public ResponseEntity<String> game(@RequestBody GameDto gameDto) {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        String gameResult = gameService.setGameData(gameDto, currentUserEmail);

        if (Objects.equals(gameResult, "success"))
        {
            return ResponseEntity.ok("유저 게임 정보 업데이트 했습니다.");
        }
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
