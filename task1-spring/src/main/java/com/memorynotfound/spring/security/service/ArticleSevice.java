package com.memorynotfound.spring.security.service;

import com.memorynotfound.spring.security.model.Article;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public interface ArticleSevice extends Serializable {
    boolean deleteByName(String name);
    boolean insert(Article article);
}
