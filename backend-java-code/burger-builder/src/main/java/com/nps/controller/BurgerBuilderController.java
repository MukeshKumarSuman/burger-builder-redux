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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nps.entity.Address;
import com.nps.entity.Customer;
import com.nps.entity.Ingredients;
import com.nps.entity.Orders;
import com.nps.repository.CustomerRepository;
import com.nps.repository.OrderRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/burger")
@Transactional
public class BurgerBuilderController {
	
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@GetMapping("/users")
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}
	
	@GetMapping("/users/{username}")
	public ResponseEntity<Customer> getCustomerFullDetails(@PathVariable String username) {
		Optional<Customer> customer = customerRepository.findByUsername(username);
		return ResponseEntity.ok(customer.get());
	}
	
	@GetMapping("/users/{username}/address")
	public ResponseEntity<?> getCustomerAllAddress(@PathVariable String username) {
		Optional<Customer> customer = customerRepository.findByUsername(username);
		return ResponseEntity.ok(customer.get().getAddress());
	}
	/*
		{
		    "username": "mukesh",
		    "fullName": "Mukesh Kumar Suman",
		    "email": "mukesh060220@gmail.com",
		    "contactNumber": "7542007544",
		    "address": [{
		    	"fullName": "Mukesh Kumar Suman",
		    	"streetAddress": "SDO Road, North Anderkila",
		    	"landmark": "Opposite Town High School",
		    	"city": "Hajipur",
		    	"state": "Bihar",
		    	"country": "India",
		    	"zipCode": "844101",
		    	"contactNumber": "7542007544",
		    	"addressType": "Home"
		    }]
		}
	*/
	// 1st time entry of user
	@PostMapping("/users")
	public ResponseEntity<?> saveCustomer( @RequestBody Customer customer) {
		Ingredients ingredients =  new Ingredients(); 
		Address address = customer.getAddress().get(0);
		address.setCustomer(customer);
		Orders order = new Orders();
		order.setIngredients(ingredients)
			.setPrice(order.getTotalPrice())
			.setAddress(address);
		customer.addOrder(order);
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
	/*
	 "order": {
		  "deliveryMethod": "Fast",
		  "ingredients": {
		  	    "salad": 2,
			    "bacon": 2,
			    "cheese": 2,
			    "meat": 2
		  }
   }
	*/
	// new order
	@PostMapping("/users/{username}/order")
	public ResponseEntity<?> addCustomerOrder( @RequestBody Orders order, @PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).get();
		order.setPrice(order.getTotalPrice());
		//customer.addOrder(order);
		//customer = customerRepository.save(customer);
		order.setCustomer(customer);
		Orders createdOorder = orderRepository.save(order);
		if (createdOorder == null) {
			return ResponseEntity.notFound().build();
		}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		          .path("/{id}")
		          .buildAndExpand(createdOorder.getId())
		          .toUri();
		 
		return ResponseEntity.created(uri).body(createdOorder);
	}
	
	// Customer all orders
	@GetMapping("/users/{username}/orders")
	public ResponseEntity<?> getAllOrders(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElse(null);
		if (customer == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(customer.getOrders());
	}
	
	@GetMapping("/users/{username}/orders/{orderId}")
	public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
		Orders order = orderRepository.findById(orderId).orElse(null);
		if (order == null) {
			return ResponseEntity.notFound().build();
		}
		return  ResponseEntity.ok(order);
	}
	/*
	{
	    "id": 1,
	    "totalPrice": 0,
	    "deliveryMethod": "slaow",
	    "ingredients": {
	        "id": 1,
	        "salad": 2,
	        "bacon": 1,
	        "cheese": 2,
	        "meat": 1
	    }
	}
	*/
	@PutMapping("/users/{username}/orders/{orderId}")
	public ResponseEntity<?> updateCustomerOrder( @RequestBody Orders orderRequest, @PathVariable Long orderId) {
		Orders oldOrder = orderRepository.findById(orderId).get();
		updateCustomerOrder(orderRequest, oldOrder);
		Address address = oldOrder.getAddress();
		if(address.getId() == null) {
			oldOrder.getCustomer().addAddress(address);
		}
		Orders updatedOorder = orderRepository.save(oldOrder);
		if (updatedOorder == null) {
	        return ResponseEntity.notFound().build();
	    } 
		return ResponseEntity.ok(updatedOorder);
	}
	
	
	private void updateCustomerOrder(Orders orderRequest, Orders order) {
		Ingredients ingredients = orderRequest.getIngredients();
		order
		.setDeliveryMethod(orderRequest.getDeliveryMethod())
		.setPrice(orderRequest.getTotalPrice())
		.setQuantity(orderRequest.getQuantity())
		.setAddress(orderRequest.getAddress())
		.getIngredients()
			.setBacon(ingredients.getBacon())
			.setCheese(ingredients.getCheese())
			.setMeat(ingredients.getMeat())
			.setSalad(ingredients.getSalad());
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> saveCustomer( @PathVariable Long id) {
		customerRepository.deleteById(id);
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
	}
	
	// Customer all address
	@GetMapping("/users/{username}/addresses")
	public ResponseEntity<?> getAddresses(@PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).orElse(null);
		if (customer == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(customer.getAddress());
	}
	public void newCustomer() {
		//refund.incredible@actcorp.in
	}
	
	/*
	private String getCustomerUserName() {
		UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userDetails.getUsername();
		/*
		 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (!(auth instanceof AnonymousAuthenticationToken)) {
		        // userDetails = auth.getPrincipal()
		}
		 
	}
	 */
}
