package com.jonjackson.ppmtool.services;

import com.jonjackson.ppmtool.domain.Backlog;
import com.jonjackson.ppmtool.domain.Project;
import com.jonjackson.ppmtool.exceptions.ProjectIDException;
import com.jonjackson.ppmtool.repositories.BacklogRepository;
import com.jonjackson.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    //enable the application to save a project
    public Project saveOrUpdateProject(Project project) {

        //TODO:
        // logic to see if updating object is user-owned, etc...

        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if(project.getId() == null){
                Backlog backlog = new Backlog();
                //set the project on the backlog...
                project.setBacklog(backlog);
                //set the backlog on the project...
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if(project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIDException(("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists"));
        }

    }

    public Project findProjectByIdentifier(String projectId) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIDException(("Project ID '" + projectId + "' does not exist"));
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIDException(("Cannot Delete Project with ID '"+projectId+"'. This project does not exist"));
        }
        projectRepository.delete(project);
    }
}
