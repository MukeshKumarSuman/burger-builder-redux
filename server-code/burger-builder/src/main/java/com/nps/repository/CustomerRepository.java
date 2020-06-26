package com.nps.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nps.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	Optional<Customer> findByUsername(String username);
	Boolean existsByUsername(String username);
    //Optional<Customer> findById(String email);
	/*
	 * Optional<Customer> findByUsernameOrEmail(String username, String email);
	 * Boolean existsByUsername(String username); Boolean existsByEmail(String
	 * email);
	 */
}
