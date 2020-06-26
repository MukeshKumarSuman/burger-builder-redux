package com.nps.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Pattern;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Transactional
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	
	private String fullName;
	
	private String email;
	
	private String password;
	
	//@Pattern(regexp="(^$|[0-9]{10})")
	private String contactNumber;
	
	
	@OneToMany(cascade = CascadeType.ALL,  orphanRemoval = true, mappedBy = "customer", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("customer")
	private List<Address> address = new ArrayList<Address>();

	@OneToMany(cascade = { CascadeType.ALL },  orphanRemoval = true, mappedBy = "customer", fetch = FetchType.LAZY)
	@JsonIgnoreProperties("customer")
	private List<Orders> orders = new ArrayList<Orders>();


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Orders> getOrders() {
		return orders;
	}

	public void setOrders(List<Orders> orders) {
		this.orders = orders;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void addOrder(Orders order) {
		orders.add(order);
		order.setCustomer(this);
	}
	
	public void removeOrder(Orders order) {
		orders.remove(order);
		order.setCustomer(null);
	}
	
	public void addAddress(Address address) {
		this.address.add(address);
		address.setCustomer(this);
	}
	
	public void removeAddress(Address address) {
		this.address.remove(address);
		address.setCustomer(this);
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public List<Address> getAddress() {
		return address;
	}

	public void setAddress(List<Address> address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", username=" + username+ ", password=" + password + ", fullName=" + fullName + ", email=" + email
				+ ", contactNumber=" + contactNumber + ", address=" + address + ", orders=" + orders + "]";
	}
	
}
