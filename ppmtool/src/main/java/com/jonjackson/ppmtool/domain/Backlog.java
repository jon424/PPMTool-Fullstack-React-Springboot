package com.jonjackson.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //sequence of project tasks in the backlog:
    private Integer PTSequence = 0;
    private String projectIdentifier;

    //OneToOne with project (each project has one backlog. one backlog belongs to one project)
    //important to name the 'project' here as named in the mappedBy in Project {}
    //JsonIgnore prevents an endless loop when creating new projects that have backlog
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="project_id", nullable = false)
    @JsonIgnore
    private Project project;

    //OneToMany with projecttasks (a backlog can have one or more projecttasks, but a projecttask can belong to one project)
    @OneToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "backlog", orphanRemoval = true)
    private List<ProjectTask> projectTasks = new ArrayList<>();

    public Backlog(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPTSequence() {
        return PTSequence;
    }

    public void setPTSequence(Integer PTSequence) {
        this.PTSequence = PTSequence;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public List<ProjectTask> getProjectTasks() {
        return projectTasks;
    }

    public void setProjectTasks(List<ProjectTask> projectTasks) {
        this.projectTasks = projectTasks;
    }
}
