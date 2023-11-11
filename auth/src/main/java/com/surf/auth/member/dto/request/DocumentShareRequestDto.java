package com.surf.auth.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentShareRequestDto {

    private List<Integer> userPkList;
    private String documentId;
}
