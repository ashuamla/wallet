package com.ashu.wallet.service;

import com.ashu.wallet.dao.UserDAO;
import com.ashu.wallet.dao.WalletDAO;
import com.ashu.wallet.model.User;
import com.ashu.wallet.model.Wallet;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    @Autowired
    WalletDAO walletDAO;

    public User getUser(String id) {
        Optional<User> user = userDAO.findById(id);
        return user.orElse(null);
    }
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public String saveUser(User user) {
        //first doing initial validations for user
        User existingUser = userDAO.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if(existingUser != null){
            return "User already exists";
        }
        try{
            userDAO.save(user);
            Wallet wallet = new Wallet();
            wallet.setUpiId(user.getUpiId());
            wallet.setMobileNumber(user.getMobileNumber());
            wallet.setBalance(0D);
            walletDAO.save(wallet);
            return "data saved successfully";
        }catch (Exception e){
            return "error in saving data: " + e ;
        }
    }

    public String validateLogin(JSONObject loginDetails) {

        String emailOrMobileNumber = loginDetails.getString("emailOrMobileNumber");
        String password = loginDetails.getString("password");
        User userByEail = userDAO.findByEmailAndPassword(emailOrMobileNumber, password);
        User userByMobile = userDAO.findByMobileNumberAndPassword(emailOrMobileNumber, password);
        if (userByEail != null || userByMobile != null) {
            return "Login successful";
        } else {
            return "Login failed";
        }
    }

    public User getUserByCredentials(JSONObject userDetails) {
        String emailOrMobileNumber = userDetails.getString("emailOrMobileNumber");
        String password = userDetails.getString("password");
        User userByEmail = userDAO.findByEmailAndPassword(emailOrMobileNumber, password);
        User userByMobile = userDAO.findByMobileNumberAndPassword(emailOrMobileNumber, password);
        if (userByEmail != null) {
            return userByEmail;
        } else return userByMobile;
    }

    public User getUserById(String id) {
        return userDAO.findById(id).orElse(null);
    }
}
