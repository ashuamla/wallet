package com.ashu.wallet.service;

import com.ashu.wallet.dao.UserDAO;
import com.ashu.wallet.model.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    public User getUser(String id) {
        Optional<User> user = userDAO.findById(id);
        return user.orElse(null);
    }
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    public String saveUser(User user) {
        try{
            userDAO.save(user);
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
}
