package com.nps.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nps.entity.Customer;
import com.nps.modal.ApiResponse;
import com.nps.modal.AuthenticationRequest;
import com.nps.repository.CustomerRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/burger")
@Transactional
public class CustomerController {
	
	
	@Autowired
	CustomerRepository customerRepository;
	
	
	@GetMapping("/users")
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
	
	@GetMapping("/users/{username}")
	public ResponseEntity<Customer> getCustomerFullDetails(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).get();
		return ResponseEntity.ok(customer);
	}
	
	@GetMapping("/users/{username}/address")
	public ResponseEntity<?> getCustomerAllAddress(@PathVariable String username) {
		Optional<Customer> customer = customerRepository.findByUsername(username);
		return ResponseEntity.ok(customer.get().getAddress());
	}
	
	/*
		{
		    "username": "test",
		    "fullName": "test Everything",
		    "email": "test@gmail.com",
		    "contactNumber": "87698098675",
		}
	 */
	@PostMapping("/register")
	public ResponseEntity<?> saveCustomerData( @RequestBody Customer customer) {
		
		if (customerRepository.existsByUsername(customer.getUsername())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already in use!"), HttpStatus.BAD_REQUEST);
		}
		
		Customer createdCcustomer = customerRepository.save(customer);
		if (createdCcustomer == null) {
			return ResponseEntity.notFound().build();
		}
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		          .path("/{id}")
		          .buildAndExpand(createdCcustomer.getId())
		          .toUri();
		 
		return ResponseEntity.created(uri).body(createdCcustomer);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate( @RequestBody AuthenticationRequest authData) {
		Customer customer = customerRepository.findByUsername(authData.getUsername()).orElse(null);
		if (customer == null) {
			return new ResponseEntity(new ApiResponse(false, "Incorrect username"), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity(customer, HttpStatus.OK);
		}

	}
	

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteCustomer( @PathVariable Long id) {
		customerRepository.deleteById(id);
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
	}

}
