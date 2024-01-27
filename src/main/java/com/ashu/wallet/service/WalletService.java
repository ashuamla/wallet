package com.ashu.wallet.service;

import com.ashu.wallet.dao.WalletDAO;
import com.ashu.wallet.model.Wallet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WalletService {
    @Autowired
    WalletDAO walletDAO;

    public Wallet getWalletByUpiId(String upiId) {
        return walletDAO.findByUpiId(upiId);
    }

}
