package com.holoseogi.holoseogi.filter;

import com.holoseogi.holoseogi.service.RedisService;
import com.holoseogi.holoseogi.type.UserRole;
import com.holoseogi.holoseogi.model.entity.User;
import com.holoseogi.holoseogi.repository.UserRepository;
import com.holoseogi.holoseogi.security.CustomUserDetails;
import com.holoseogi.holoseogi.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository; // debug 모드 설정 때 필요
    private final RedisService redisService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = parseBearerToken(request);

        // debug 모드
        if (StringUtils.hasText(token) && token.equals("debug")) {
            this.setDebugMode();
        }
        // Validation Access Token
        else if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            // 로그인 여부 체크
            if (redisService.checkExistsValue(
                    redisService.getValues("JWT_TOKEN:" + ((CustomUserDetails) authentication.getPrincipal()).getName()))) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } else {
            log.info("유효한 JWT 토큰이 없습니다.");
        }
        filterChain.doFilter(request, response);
    }

    // debugMode : 토큰 없이도 로그인 상태로 만듬
    private void setDebugMode() {
        User admin = userRepository.findByEmail("admin@gmail.com").get();
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(UserRole.MENTOR.getRole().split(","))
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        CustomUserDetails principal = new CustomUserDetails(admin.getId(), "", authorities);

        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(principal, "", authorities));
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}