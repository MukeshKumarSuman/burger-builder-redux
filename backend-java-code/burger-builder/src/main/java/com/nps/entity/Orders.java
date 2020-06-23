package com.nps.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nps.modal.OrderStatus;

@Entity
@Transactional
public class Orders {

	  private static final int SALAD_PRICE = 10; 
	  private static final int BACON_PRICE = 10; 
	  private static final int CHEESE_PRICE = 10; 
	  private static final int MEAT_PRICE = 10;
	  
	  // Order Status
	  private static final String PENDING = "PENDING"; // Payment not done
	  private static final String PROCESSING = "PROCESSING"; // //Preparation
	  private static final String READY = "READY"; // Preparation done
	  private static final String COMPLETED = "COMPLETED"; // Order Delivered

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer price;
	
	private Integer quantity = 1;

	private String deliveryMethod = "fast";
	
	private String status = PENDING;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;

	@OneToOne(cascade = CascadeType.ALL)
	private Ingredients ingredients;

	// 
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties("orders")
	@JsonIgnore
	private Customer customer;
	
	public Orders() {

	}

	@JsonIgnore
	public int getTotalPrice() {
		return SALAD_PRICE * ingredients.getSalad() + BACON_PRICE * ingredients.getBacon() + CHEESE_PRICE * ingredients.getCheese() + MEAT_PRICE * ingredients.getMeat();
	}

	public Long getId() {
		return id;
	}

	public Orders setId(Long id) {
		this.id = id;
		return this;
	}

	public String getDeliveryMethod() {
		return deliveryMethod;
	}

	public Orders setDeliveryMethod(String deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
		return this;
	}

	public Ingredients getIngredients() {
		return ingredients;
	}

	public Orders setIngredients(Ingredients ingredients) {
		this.ingredients = ingredients;
		return this;
	}

	public Integer getPrice() {
		return price;
	}

	public Orders setPrice(Integer price) {
		this.price = price;
		return this;
	}

	public Customer getCustomer() {
		return customer;
	}

	public Orders setCustomer(Customer customer) {
		this.customer = customer;
		return this;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public Orders setQuantity(Integer quantity) {
		this.quantity = quantity;
		return this;
	}


	public String getStatus() {
		return status;
	}

	public Orders setStatus(String status) {
		this.status = status;
		return this;
	}

	public Address getAddress() {
		return address;
	}

	public Orders setAddress(Address address) {
		this.address = address;
		return this;
	}

	@Override
	public String toString() {
		return "Orders [id=" + id + ", price=" + price + ", quantity=" + quantity + ", deliveryMethod=" + deliveryMethod
				+ ", status=" + status + ", address=" + address + ", ingredients=" + ingredients + ", customer="
				+ customer + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Orders other = (Orders) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
