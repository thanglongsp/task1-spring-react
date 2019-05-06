package com.memorynotfound.spring.security.repository;


import com.memorynotfound.spring.security.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query("select article from Article article where article.name = :name")
    Article findByName(@Param("name") String name);
}
