package com.techgeeks.repository;

import com.techgeeks.domain.Emp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpRepository extends PagingAndSortingRepository<Emp, Long> {

    @Query("FROM Emp b WHERE b.name LIKE %:searchText% OR b.reportsTo LIKE %:searchText% OR b.designation LIKE %:searchText% OR b.dept LIKE %:searchText% ORDER BY b.experience ASC")
    Page<Emp> findAllEmps(Pageable pageable, @Param("searchText") String searchText);
}
