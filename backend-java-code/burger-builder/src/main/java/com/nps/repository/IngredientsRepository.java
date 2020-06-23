package com.nps.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nps.entity.Ingredients;

public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {

}
