package com.surf.quiz.fegin;


import com.surf.quiz.dto.editor.ApiResponse;
import com.surf.quiz.dto.editor.EditorCheckResponse;
import com.surf.quiz.dto.member.FindUserPkListDto;
import com.surf.quiz.dto.member.UserInfoResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;


@FeignClient(name="server-auth", url="https://k9e101.p.ssafy.io")
public interface UserServiceFeignClient {
    @GetMapping("/api/auth/user-info/pk-list")
    ResponseEntity<List<UserInfoResponseDto>> userInfoByUserPkList(@RequestBody FindUserPkListDto userPkListDto);
}
