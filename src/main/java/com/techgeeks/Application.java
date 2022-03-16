package com.techgeeks;

import com.techgeeks.domain.Emp;
import com.techgeeks.domain.Role;
import com.techgeeks.domain.User;
import com.techgeeks.service.IRoleService;
import com.techgeeks.service.IService;
import com.techgeeks.utils.ConstantUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Autowired
	private IService<User> userService;

	@Autowired
	private IRoleService<Role> roleService;

	@Autowired
	private IService<Emp> empService;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.saveOrUpdate(new Role(ConstantUtils.ADMIN.toString()));
			roleService.saveOrUpdate(new Role(ConstantUtils.USER.toString()));
		}

		if (userService.findAll().isEmpty()) {
			User user1 = new User();
			user1.setEmail("test@user.com");
			user1.setName("Test User");
			user1.setMobile("9787456545");
			user1.setRole(roleService.findByName(ConstantUtils.USER.toString()));
			user1.setPassword(new BCryptPasswordEncoder().encode("testuser"));
			userService.saveOrUpdate(user1);

			User user2 = new User();
			user2.setEmail("test@admin.com");
			user2.setName("Test Admin");
			user2.setMobile("9787456545");
			user2.setRole(roleService.findByName(ConstantUtils.ADMIN.toString()));
			user2.setPassword(new BCryptPasswordEncoder().encode("testadmin"));
			userService.saveOrUpdate(user2);
		}

		if (empService.findAll().isEmpty()) {
			for (int i = 1; i <= 2; i++) {
				Emp emp = new Emp();
				emp.setName("Abhishek");
				emp.setReportsTo("xyz");
				// emp.setCoverPhotoURL(
				// 		"https://images-na.ssl-images-amazon.com/images/I/417zLTa1uqL._SX397_BO1,204,203,200_.jpg");
				emp.setContactNumber(1617293989L);
				emp.setExperience(2.5);
				emp.setDesignation(".net developer");
				emp.setDept("xyz");
				emp.saveOrUpdate(emp);
			}
		}
	}

}
