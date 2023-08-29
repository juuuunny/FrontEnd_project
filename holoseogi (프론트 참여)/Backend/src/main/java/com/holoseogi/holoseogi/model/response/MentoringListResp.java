package com.holoseogi.holoseogi.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.holoseogi.holoseogi.model.entity.ApplyMentee;
import com.holoseogi.holoseogi.model.entity.Mentoring;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MentoringListResp {
    private Long id;
    private String title;
    private String category;
    private Integer count;
    private Integer limited;
    private Boolean isReceipt;
    private LocalDateTime createDate;
    private String creatorName;
    private String description;

    public MentoringListResp(Mentoring mentoring) {
        this.id = mentoring.getId();
        this.title = mentoring.getTitle();
        this.category = mentoring.getCategory().getLabel();
        this.count = mentoring.getCount();
        this.limited = mentoring.getLimited();
        this.isReceipt = mentoring.getIsReceipt();
        this.createDate = mentoring.getCreateDate();
        this.creatorName = mentoring.getMentor().getName();
    }

}
