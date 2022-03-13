package com.jonjackson.ppmtool.services;

import com.jonjackson.ppmtool.domain.Backlog;
import com.jonjackson.ppmtool.domain.Project;
import com.jonjackson.ppmtool.domain.ProjectTask;
//import com.jonjackson.ppmtool.exceptions.ProjectNotFoundException;
import com.jonjackson.ppmtool.exceptions.ProjectNotFoundException;
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

//    @Autowired
//    private ProjectRepository projectRepository;

//    @Autowired
//    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        //Exceptions: Project not found

        try{
            //all PTs to be added to a specific project (if the Project !=null, BL exists)
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            //set backlog to the projectTask
            projectTask.setBacklog(backlog);

            // we want project sequence to be in order, regardless of db id... we are using projectIdentifier
            Integer BacklogSequence = backlog.getPTSequence();

            //Update the BL Sequence
            BacklogSequence++;

            backlog.setPTSequence(BacklogSequence);

            //add sequence to Project Task
            projectTask.setProjectSequence(backlog.getProjectIdentifier()+"-"+BacklogSequence);
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
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public Iterable<ProjectTask>findBacklogById(String id){

        Project project = projectRepository.findByProjectIdentifier(id);
        if(project==null){
            throw new ProjectNotFoundException("Project with ID: '"+id+"' does not exist");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id){
        // make sure we are searching on an existing backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if(backlog==null){
            throw new ProjectNotFoundException("Project with ID: '"+backlog_id+"' does not exist");
        }

        // make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask==null){
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' not found");
        }

        // make sure that the backlog/project id in the path corresponds to the right project
        // i.e: http://localhost:8080/api/backlog/1237/1237-5
        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' does not exist in project: '"+backlog_id+"'");

        }

        return projectTask;
    }
}
