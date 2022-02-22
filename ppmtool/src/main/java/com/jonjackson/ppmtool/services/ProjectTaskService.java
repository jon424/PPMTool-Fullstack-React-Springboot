package com.jonjackson.ppmtool.services;

import com.jonjackson.ppmtool.domain.Backlog;
import com.jonjackson.ppmtool.domain.Project;
import com.jonjackson.ppmtool.domain.ProjectTask;
//import com.jonjackson.ppmtool.exceptions.ProjectNotFoundException;
import com.jonjackson.ppmtool.repositories.BacklogRepository;
import com.jonjackson.ppmtool.repositories.ProjectRepository;
import com.jonjackson.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        //Exceptions: Project not found

        //all PTs to be added to a specific project (if the Project !=null, BL exists)
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier).getBacklog();
        //set backlog to the projectTask
        projectTask.setBacklog(backlog);

        // we want project sequence to be in order, regardless of db id... we are using projectIdentifier
        Integer BacklogSequence = backlog.getPTSequence();

        //Update the BL Sequence
        BacklogSequence++;

        backlog.setPTSequence(BacklogSequence);

        //add sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        //INITIAL priority when priority is null (low3, med.2, hi1)
//        if (projectTask.getPriority() == 0|| projectTask.getPriority() == null){
//            projectTask.setPriority(3);
//        }
        //initial status when status is null
        if(projectTask.getStatus() == "" || projectTask.getStatus() == null){
            projectTask.setStatus("TODO");
        }

        if (projectTask.getPriority() == null || projectTask.getPriority() == 0){
            projectTask.setPriority(3);
        }
        return projectTaskRepository.save(projectTask);
    }
}
