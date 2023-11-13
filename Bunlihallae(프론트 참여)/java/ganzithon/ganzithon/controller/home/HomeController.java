package ganzithon.ganzithon.controller.home;

import ganzithon.ganzithon.dto.myPage.MyPageDto;
import ganzithon.ganzithon.dto.user.UserMyPageDto;
import ganzithon.ganzithon.service.auth.AuthenticationService;
import ganzithon.ganzithon.service.myPage.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/home")
public class HomeController {
    private final AuthenticationService authenticationService;
    private final MyPageService myPageService; // MyPageService를 추가합니다.

    // 메인 페이지로 이동
    @GetMapping
    public ResponseEntity<MyPageDto> getHome() {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        // 사용자 이메일을 통해 마이 페이지 정보를 가져옵니다.
        MyPageDto myPageDto = myPageService.getMyPageInfo(currentUserEmail);

        // userMyPageDto가 null이 아닌 경우 정상적인 응답을 반환합니다.
        if (myPageDto != null) {
            return ResponseEntity.ok(myPageDto);
        } else {
            // userMyPageDto가 null인 경우, NOT FOUND 응답을 반환합니다.
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
