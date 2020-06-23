package com.nps.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Transactional
public class Address {
	/*
	 {
	    "username": "mukesh",
	    "address": {
	    	"fullName": "Mukesh Kumar Suman",
	    	"streetAddress": "SDO Road, North Anderkila",
	    	"landmark": "Opposite Town High School",
	    	"city": "Hajipur",
	    	"state": "Bihar",
	    	"country": "India",
	    	"zipCode": "844101",
	    	"contactNumber": "7542007544",
	    	"addressType": "Home"
	    }
	}
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String fullName;
	
	//Flat/House No./Floor/Building/colony/street/locality
	private String streetAddress;
	
	private String landmark;
	
	private String city;
	
	private String state;
	
	private String country;
	private String zipCode;
	
	//@Pattern(regexp="(^$|[0-9]{10})")
	private String contactNumber;
	
	private String email;
	
	private String addressType; // Home/Office
	
	private boolean defaultAddress = false;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties("address")
	@JsonIgnore
	private Customer customer;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public Address setFullName(String fullName) {
		this.fullName = fullName;
		return this;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public Address setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
		return this;
	}

	public String getLandmark() {
		return landmark;
	}

	public Address setLandmark(String landmark) {
		this.landmark = landmark;
		return this;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public Address setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
		return this;
	}

	public String getAddressType() {
		return addressType;
	}

	public Address setAddressType(String addressType) {
		this.addressType = addressType;
		return this;
	}

	public String getCity() {
		return city;
	}

	public Address setCity(String city) {
		this.city = city;
		return this;
	}

	public String getState() {
		return state;
	}

	public Address setState(String state) {
		this.state = state;
		return this;
	}

	public String getCountry() {
		return country;
	}

	public Address setCountry(String country) {
		this.country = country;
		return this;
	}

	public String getZipCode() {
		return zipCode;
	}

	public Address setZipCode(String zipCode) {
		this.zipCode = zipCode;
		return this;
	}

	
	public Customer getCustomer() {
		return customer;
	}

	public Address setCustomer(Customer customer) {
		this.customer = customer;
		return this;
	}

	public boolean isDefaultAddress() {
		return defaultAddress;
	}

	public Address setDefaultAddress(boolean defaultAddress) {
		this.defaultAddress = defaultAddress;
		return this;
	}

	public String getEmail() {
		return email;
	}

	public Address setEmail(String email) {
		this.email = email;
		return this;
	}

	@Override
	public String toString() {
		return "Address [id=" + id + ", fullName=" + fullName + ", streetAddress=" + streetAddress + ", landmark="
				+ landmark + ", city=" + city + ", state=" + state + ", country=" + country + ", zipCode=" + zipCode
				+ ", contactNumber=" + contactNumber + ", email=" + email + ", addressType=" + addressType
				+ ", defaultAddress=" + defaultAddress + ", customer=" + customer + "]";
	}

}
