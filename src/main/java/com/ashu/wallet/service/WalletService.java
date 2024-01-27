package com.ashu.wallet.service;

import com.ashu.wallet.dao.TransactionDAO;
import com.ashu.wallet.dao.WalletDAO;
import com.ashu.wallet.model.Transaction;
import com.ashu.wallet.model.Wallet;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.ashu.wallet.constants.WalletConsntants.*;

@Service
public class WalletService {
    @Autowired
    WalletDAO walletDAO;

    @Autowired
    TransactionDAO transactionDAO;

    public Wallet getWalletByUpiId(String upiId) {
        return walletDAO.findByUpiId(upiId);
    }

    public String addMoneyInWallet(Map<String, String> loadingDetails) {
        String upiId = loadingDetails.get("upiId");
        String amount = (loadingDetails.get("amount"));
        double loadingAmount = 0;
        //trying to convert string to double
        try {
            loadingAmount = Double.parseDouble(amount);
        } catch (Exception e) {
            return "Invalid amount";
        }
        if (upiId != null && loadingAmount > 0) {
            Wallet wallet = walletDAO.findByUpiId(upiId);
            if (wallet != null) {
                wallet.setBalance(wallet.getBalance() + loadingAmount);
                walletDAO.save(wallet);
                return "Money added successfully";
            }
            return "Wallet not found";
        }
        return "Invalid data";
    }

    public String recordTransaction(Map<String, String> transactionDetails) {
        String account = transactionDetails.get("account");
        String amount = (transactionDetails.get("amount"));
        String upiId = transactionDetails.get("upiId");
        String narration = transactionDetails.get("narration");
        double transactionAmount = 0;
        //trying to convert string to double
        try {
            transactionAmount = Double.parseDouble(amount);
        } catch (Exception e) {
            return "Invalid amount";
        }
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(TIMESTAMP_FORMAT);
        LocalDateTime now = LocalDateTime.now();
        String transactionDate = dtf.format(now);

        Transaction transaction = new Transaction();
        transaction.setAmount(transactionAmount);
        transaction.setTransactionDate(transactionDate);
        transaction.setUpiId(upiId);

        if (StringUtils.equalsIgnoreCase(narration, CREDIT)) {
            transaction.setNarration(CREDIT);
            transaction.setAccount(SELF);
        } else if (StringUtils.equalsIgnoreCase(narration, DEBIT)) {
            transaction.setNarration(DEBIT);
            transaction.setAccount(account);
        } else {
            return "Invalid transaction type";
        }

        transactionDAO.save(transaction);
        return "transaction recorded successfully";
    }

    public List<Transaction> showTransactions(Map<String, String> transactionDetails) {
        String upiId = transactionDetails.get("upiId");
        if (upiId != null) {
            List<Transaction> transactions = transactionDAO.findByUpiId(upiId);
            if (transactions != null) {
                return transactions;
            }
        }
        return new ArrayList<>();
    }
}
