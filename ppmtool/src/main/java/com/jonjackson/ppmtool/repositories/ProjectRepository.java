package com.jonjackson.ppmtool.repositories;

import com.jonjackson.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
//extend the CrudRepository, passing in the Project object and the type of ID (Long)
//CrudRepository gives us a set of methods to use out of the box
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Override
    Iterable<Project> findAllById(Iterable<Long> longs);
}
