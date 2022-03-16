package com.techgeeks.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_emp")
public class Emp {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String reportsTo;

	// @Column(nullable = false)
	// private String coverPhotoURL;

	@Column(nullable = false)
	private Long contactNumber;

	@Column(nullable = false)
	private Double experience;

	@Column(nullable = false)
	private String designation;

	@Column(nullable = false)
	private String dept;

	@OneToOne
    @JoinColumn(name = "fk_sr_soft_engg")
    private Sr_Soft_Engg sr_Soft_Engg;

    @OneToOne
    @JoinColumn(name = "fk_tech_lead")
    private Tech_Lead tech_Lead;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReportsTo() {
		return reportsTo;
	}

	public void setReportsTo(String reportsTo) {
		this.reportsTo = reportsTo;
	}

	public Long getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}

	public Double getExperience() {
		return experience;
	}

	public void setExperience(Double experience) {
		this.experience = experience;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

    public void saveOrUpdate(Emp emp) {
    }

	public Sr_Soft_Engg getSr_Soft_Engg() {
		return sr_Soft_Engg;
	}

	public void setSr_Soft_Engg(Sr_Soft_Engg sr_Soft_Engg) {
		this.sr_Soft_Engg = sr_Soft_Engg;
	}

	public Tech_Lead getTech_Lead() {
		return tech_Lead;
	}

	public void setTech_Lead(Tech_Lead tech_Lead) {
		this.tech_Lead = tech_Lead;
	}

	

	

	// public void setTitle(String title) {
	// 	this.title = title;
	// }

	// public String getAuthor() {
	// 	return author;
	// }

	// public void setAuthor(String author) {
	// 	this.author = author;
	// }

	// public String getCoverPhotoURL() {
	// 	return coverPhotoURL;
	// }

	// public void setCoverPhotoURL(String coverPhotoURL) {
	// 	this.coverPhotoURL = coverPhotoURL;
	// }

	// public Long getIsbnNumber() {
	// 	return isbnNumber;
	// }

	// public void setIsbnNumber(Long isbnNumber) {
	// 	this.isbnNumber = isbnNumber;
	// }

	// public Double getPrice() {
	// 	return price;
	// }

	// public void setPrice(Double price) {
	// 	this.price = price;
	// }

	// public String getLanguage() {
	// 	return language;
	// }

	// public void setLanguage(String language) {
	// 	this.language = language;
	// }

	// public String getGenre() {
	// 	return genre;
	// }

	// public void setGenre(String genre) {
	// 	this.genre = genre;
	// }
}
