package com.ashu.wallet.dao;

import com.ashu.wallet.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TransactionDAO extends MongoRepository<Transaction, String> {
    List<Transaction> findByUpiId(String upiId);
}
