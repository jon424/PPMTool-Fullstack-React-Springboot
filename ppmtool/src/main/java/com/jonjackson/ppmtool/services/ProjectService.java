package com.jonjackson.ppmtool.services;

import com.jonjackson.ppmtool.domain.Project;
import com.jonjackson.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    //enable the application to save a project
    public Project saveOrUpdateProject(Project project){

        //TODO:
        // logic to see if updating object is user-owned, etc...

        return projectRepository.save(project);
    }
}
