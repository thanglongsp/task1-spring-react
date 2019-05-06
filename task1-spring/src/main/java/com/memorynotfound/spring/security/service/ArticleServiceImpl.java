package com.memorynotfound.spring.security.service;

import com.memorynotfound.spring.security.model.Article;
import com.memorynotfound.spring.security.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ArticleServiceImpl implements ArticleSevice {
    @Autowired
    ArticleRepository articleRepository;

    public List<Article> getAll(){
        return articleRepository.findAll();
    }

    public Article findByName(String name){
        return articleRepository.findByName(name);
    }

    public Article findById(int id){
        return articleRepository.findOne(id);
    }

    public boolean deleteById(int id){
        articleRepository.delete(id);
        return true;
    }

    @Override
    public boolean deleteByName(String name) {
        Article article = articleRepository.findByName(name);
        articleRepository.delete(article.getId());
        return true;
    }

    @Override
    public boolean insert(Article article) {
        articleRepository.save(article);
        return false;
    }
}
