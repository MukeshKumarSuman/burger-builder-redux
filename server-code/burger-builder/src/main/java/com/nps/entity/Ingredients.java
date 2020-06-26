package com.nps.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Ingredients {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int salad;
	private int bacon;
	private int cheese;
	private int meat;
		
	public Ingredients() {
		
	}

	public Ingredients(int salad, int bacon, int cheese, int meat) {
		this.salad = salad;
		this.bacon = bacon;
		this.cheese = cheese;
		this.meat = meat;
	}

	public Long getId() {
		return id;
	}

	public Ingredients setId(Long id) {
		this.id = id;
		return this;
	}

	public int getSalad() {
		return salad;
	}

	public Ingredients setSalad(int salad) {
		this.salad = salad;
		return this;
	}

	public int getBacon() {
		return bacon;
	}

	public Ingredients setBacon(int bacon) {
		this.bacon = bacon;
		return this;
	}

	public int getCheese() {
		return cheese;
	}

	public Ingredients setCheese(int cheese) {
		this.cheese = cheese;
		return this;
	}

	public int getMeat() {
		return meat;
	}

	public Ingredients setMeat(int meat) {
		this.meat = meat;
		return this;
	}

	@Override
	public String toString() {
		return "Ingredients [id=" + id + ", salad=" + salad + ", bacon=" + bacon + ", cheese=" + cheese + ", meat="
				+ meat + "]";
	}
	
}
