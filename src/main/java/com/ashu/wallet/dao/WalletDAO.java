package com.ashu.wallet.dao;

import com.ashu.wallet.model.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WalletDAO extends MongoRepository<Wallet, String> {
    Wallet findByUpiId(String upid);
}
