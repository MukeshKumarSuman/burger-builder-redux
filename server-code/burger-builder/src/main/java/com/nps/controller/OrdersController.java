package com.nps.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import com.nps.modal.ApiResponse;
import com.nps.modal.AuthenticationRequest;
import com.nps.repository.AddressRepository;
import com.nps.repository.CustomerRepository;
import com.nps.repository.IngredientsRepository;
import com.nps.repository.OrderRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/burger")
@Transactional
public class OrdersController {
	
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	IngredientsRepository ingredientsRepository;
	
	@Autowired
	AddressRepository addressRepository;
	
	
	@GetMapping("/order")
	public ResponseEntity<?> getOrder() {
		Orders order = new Orders();
		Ingredients ing = new Ingredients();
		order.setIngredients(ing);
		order.setPrice(order.getTotalPrice());
		return ResponseEntity.ok(order);
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
	public ResponseEntity<?> addCustomerOrder( @RequestBody Orders requestOrder, @PathVariable String username) {
		Customer customer = customerRepository.findByUsername(username).get();
		
		Ingredients ingredients = requestOrder.getIngredients();
		if (ingredients.getId() != null) {
			ingredientsRepository.save(ingredients);
		}
		
		
		Address address = requestOrder.getAddress();
		if (address.getId() != null) {
			addressRepository.save(address);
		} else {
			customer.addAddress(address);
		}
		
		requestOrder.setPrice(requestOrder.getTotalPrice());
		customer.addOrder(requestOrder);
		
		//customer = customerRepository.save(customer);
		Orders createdOorder = orderRepository.save(requestOrder);
		if (createdOorder == null) {
			return ResponseEntity.notFound().build();
		}
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
		          .path("/{id}")
		          .buildAndExpand(createdOorder.getId())
		          .toUri();
		 
		return ResponseEntity.created(uri).body(createdOorder);
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

	
	@DeleteMapping("/users/{username}/orders/{orderId}")
	public ResponseEntity<?> deleteOrder(@PathVariable String username, @PathVariable Long orderId) {
		Customer customer = customerRepository.findByUsername(username).get();
		List<Orders> orders = customer.getOrders().stream().filter( order -> order.getId() == orderId).collect(Collectors.toList());
		customer.removeOrder(orders.get(0));
		customerRepository.save(customer);
		return ResponseEntity.ok(HttpStatus.ACCEPTED);
	}
	
}
