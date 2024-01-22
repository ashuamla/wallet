package com.ashu.wallet.controller;

import com.ashu.wallet.model.User;
import com.ashu.wallet.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class WalletController {

    private UserService userService;


    @Autowired
    public WalletController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public User getUser(@RequestParam String id){
        return userService.getUser(id);
    }

    @GetMapping("/allusers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    @PostMapping("/register")
    public String addUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public String userLogin(@RequestBody Map<String, String> loginDetails){
         JSONObject userDetails = new JSONObject(loginDetails);
        return userService.validateLogin(userDetails);
    }

}
