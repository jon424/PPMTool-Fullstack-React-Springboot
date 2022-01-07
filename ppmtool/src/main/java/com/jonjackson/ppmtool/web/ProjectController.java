package com.jonjackson.ppmtool.web;

import com.jonjackson.ppmtool.domain.Project;
import com.jonjackson.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    //create new project
    @PostMapping("")
    //control response statuses with response entity. ResponseEntity comes with Springboot
    public ResponseEntity<Project> createNewProject(@RequestBody Project project) {
        Project project1 = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }
}
