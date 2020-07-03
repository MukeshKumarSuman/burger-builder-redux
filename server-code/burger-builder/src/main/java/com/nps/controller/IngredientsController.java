package com.nps.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nps.entity.Ingredients;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/burger")
public class IngredientsController {

	@GetMapping("/ingredients")
	public ResponseEntity<Ingredients> getDefaultIngredients() {
		return ResponseEntity.ok(new Ingredients());
	}
}
