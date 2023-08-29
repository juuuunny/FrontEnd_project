package com.holoseogi.holoseogi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("/oauth2/redirect")
    public String oauth2RedirectTest() {
        return "성공";
    }
}
