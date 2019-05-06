package com.memorynotfound.spring.security.controller;

import com.memorynotfound.spring.security.model.Article;
import com.memorynotfound.spring.security.service.ArticleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {
    @Autowired
    ArticleServiceImpl articleSeviceImpl;

    // get all
    @GetMapping("/getall")
    public List<Article> getAll() {
        List<Article> list = articleSeviceImpl.getAll();
        System.out.println("ok");
        return list;
    }

    // get one
    @RequestMapping(path = "/getone/{name}", method = RequestMethod.GET)
    public Article findByName(@PathVariable("name") String name) {
        System.out.println("ok");
        return articleSeviceImpl.findByName(name);
    }

    // delete
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    public String deleteWord(@RequestParam("name") String name, @RequestParam("id") String id) {
        if (!id.equals("")) {
            articleSeviceImpl.deleteById(Integer.valueOf(id));
            return "ok";
        }
        if (!name.equals("")) {
            articleSeviceImpl.deleteByName(name);
            return "Ok";
        }
        return "false";
    }

    // insert
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    public void insert(@RequestParam("name") String name, @RequestParam("date") String created_at) {
        Article article = new Article();
        article.setName(name);
        article.setCreated_at(created_at);
        articleSeviceImpl.insert(article);
        System.out.println("ok");
    }

    // update
    @RequestMapping(path = "/update", method = RequestMethod.POST)
    public String update(@RequestParam("id") int id, @RequestParam("name") String name,
                         @RequestParam("created_at") String created_at) {
        Article article = articleSeviceImpl.findById(id);
        if (!name.equals(""))
            article.setName(name);
        if (!created_at.equals(""))
            article.setCreated_at(created_at);
        articleSeviceImpl.insert(article);
        return "Ok";
    }
}
