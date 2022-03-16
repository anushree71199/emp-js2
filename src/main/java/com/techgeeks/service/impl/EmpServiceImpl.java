package com.techgeeks.service.impl;

import java.util.Collection;
import java.util.Optional;

import com.techgeeks.domain.Emp;
import com.techgeeks.repository.EmpRepository;
import com.techgeeks.service.IPageService;
import com.techgeeks.service.IService;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EmpServiceImpl implements IService<Emp>, IPageService<Emp> {

	@Autowired
	private EmpRepository empRepository;
	
	@Override
	public Collection<Emp> findAll() {
		return (Collection<Emp>) empRepository.findAll();
	}

	@Override
	public Page<Emp> findAll(Pageable pageable, String searchText) {
		return empRepository.findAllEmps(pageable, searchText);
	}

	@Override
	public Page<Emp> findAll(Pageable pageable) {
		return empRepository.findAll(pageable);
	}

	@Override
	public Optional<Emp> findById(Long id) {
		return empRepository.findById(id);
	}

	@Override
	public Emp saveOrUpdate(Emp emp) {
		return empRepository.save(emp);
	}

	@Override
	public String deleteById(Long id) {
		JSONObject jsonObject = new JSONObject();
		try {
			empRepository.deleteById(id);
			jsonObject.put("message", "Deleted successfully");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return jsonObject.toString();
	}

}
