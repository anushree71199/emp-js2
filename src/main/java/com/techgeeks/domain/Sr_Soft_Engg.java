package com.techgeeks.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_sr_soft_engg")
public class Sr_Soft_Engg {


    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
	private String sr_name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSr_name() {
        return sr_name;
    }

    public void setSr_name(String sr_name) {
        this.sr_name = sr_name;
    }

    
    
}
