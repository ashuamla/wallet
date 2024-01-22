package com.ashu.wallet.dao;

import com.ashu.wallet.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends MongoRepository<User,String> {
    User findByEmailAndPassword(String email, String password);

    User findByMobileNumberAndPassword(String mobileNumber, String password);
}
