package ganzithon.ganzithon.controller.user;

import ganzithon.ganzithon.dto.token.TokenDto;
import ganzithon.ganzithon.dto.user.UserDto;
import ganzithon.ganzithon.service.token.TokenService;
import ganzithon.ganzithon.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserDto userDto) {
        TokenDto jwt = userService.login(userDto);
        return jwt != null ?
                ResponseEntity.ok(jwt) :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserDto userDto) {
        String signupResult = userService.save(userDto);
        return "error".equals(signupResult) ?
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("존재하는 이메일 입니다.") :
                ResponseEntity.ok(signupResult);
    }

    @PostMapping("/out")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        return tokenService.extractToken(request.getHeader("Authorization"))
                .map(token -> {
                    tokenService.blacklistToken(token);
                    return ResponseEntity.ok("로그아웃 성공");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰을 찾을 수 없습니다."));
    }

}
