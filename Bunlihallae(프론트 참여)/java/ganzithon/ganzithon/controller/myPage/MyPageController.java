package ganzithon.ganzithon.controller.myPage;

import ganzithon.ganzithon.dto.myPage.MyPageDto;
import ganzithon.ganzithon.dto.user.UpdateDto;
import ganzithon.ganzithon.service.auth.AuthenticationService;
import ganzithon.ganzithon.service.myPage.MyPageService;
import ganzithon.ganzithon.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myPage")
public class MyPageController {
    private final UserService userService;
    private final MyPageService myPageService;
    private final AuthenticationService authenticationService;

    // 마이페이지 정보 조회
    @GetMapping
    public ResponseEntity<MyPageDto> getMyPage() {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        MyPageDto myPageDto = myPageService.getMyPageInfo(currentUserEmail);

        if (myPageDto != null) {
            return ResponseEntity.ok(myPageDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateAddress(@RequestBody UpdateDto updateDTO) {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        String updateResult = userService.update(currentUserEmail, updateDTO.getNewAddress());


        if (updateResult == "error") {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저를 찾을 수 없습니다.");
        }
        else {
            return ResponseEntity.ok("주소를 바꿨습니다.");
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<String> delete() {
        String currentUserEmail = authenticationService.getCurrentAuthenticatedUserEmail();
        String deleteResult = userService.delete(currentUserEmail);
        return "error".equals(deleteResult) ?
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저를 찾을 수 없습니다.") :
                ResponseEntity.ok("회원탈퇴 완료");
    }

}
