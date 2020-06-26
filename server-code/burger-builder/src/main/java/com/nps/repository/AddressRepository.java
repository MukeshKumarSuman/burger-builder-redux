package com.nps.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nps.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    //Optional<Customer> findById(String email);
	/*
	 * Optional<Customer> findByUsernameOrEmail(String username, String email);
	 * Boolean existsByUsername(String username); Boolean existsByEmail(String
	 * email);
	 */
}
