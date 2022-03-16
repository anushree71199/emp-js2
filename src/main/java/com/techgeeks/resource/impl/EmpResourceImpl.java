package com.techgeeks.resource.impl;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

import com.techgeeks.domain.Emp;
import com.techgeeks.resource.Resource;
import com.techgeeks.service.IPageService;
import com.techgeeks.service.IService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/emps")
@CrossOrigin(origins="http://localhost:3000")
public class EmpResourceImpl implements Resource<Emp> {
	
	@Autowired
	private IService<Emp> empService;
	
	@Autowired
	private IPageService<Emp> empPageService;

	@Override
	public ResponseEntity<Page<Emp>> findAll(Pageable pageable, String searchText) {
		return new ResponseEntity<>(empPageService.findAll(pageable, searchText), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Page<Emp>> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		return new ResponseEntity<>(empPageService.findAll(
				PageRequest.of(
						pageNumber, pageSize,
						sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
				)
		), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Emp> findById(Long id) {
		return new ResponseEntity<>(empService.findById(id).get(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Emp> save(Emp emp) {
		return new ResponseEntity<>(empService.saveOrUpdate(emp), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<Emp> update(Emp emp) {
		return new ResponseEntity<>(empService.saveOrUpdate(emp), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteById(Long id) {
		return new ResponseEntity<>(empService.deleteById(id), HttpStatus.OK);
	}

	@GetMapping("/designations")
	public  ResponseEntity<Set<String>> findAllDesignations() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Product Manager", "Software Engineer", "Web Developer", "UI/UX Developer", ".Net Developer", "Talent Acquistion Manager", "Hiring Manager", "DevOps Engineer")), HttpStatus.OK);
    }

    @GetMapping("/depts")
    public  ResponseEntity<Set<String>> findAllDepts() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Learning and Development", "Marketing", "Finance", "Human Resources", "Consultancy", "Business Logistics", "Research and Development")), HttpStatus.OK);
    }
}
