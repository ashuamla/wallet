package com.ashu.wallet.controller;

import com.ashu.wallet.model.Transaction;
import com.ashu.wallet.model.User;
import com.ashu.wallet.model.Wallet;
import com.ashu.wallet.service.UserService;
import com.ashu.wallet.service.WalletService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class WalletController {

    private UserService userService;
    private WalletService walletService;


    @Autowired
    public WalletController(UserService userService, WalletService walletService){
        this.userService = userService;
        this.walletService = walletService;
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
    public User userLogin(@RequestBody Map<String, String> loginDetails){
         JSONObject userDetails = new JSONObject(loginDetails);
        String validtion = userService.validateLogin(userDetails);
        if(StringUtils.equalsIgnoreCase(validtion, "Login successful")){
            return userService.getUserByCredentials(userDetails);
        }
        return null;
    }

    /**
     * Endpoint to retrieve a user by ID.
     *
     * @param user The user object containing the ID to retrieve.
     * @return The user object with the specified ID.
     */
    @PostMapping("/user/id")
    public User getUserById(@RequestBody User user){
        return userService.getUserById(user.getId());
    }

    @PostMapping("/wallet/upiId")
    public Wallet getWalletById(@RequestBody Map<String, String> upiId){
        return walletService.getWalletByUpiId(upiId.get("upiId"));
    }

    @PostMapping("/wallet/load")
    public String loadWallet(@RequestBody Map<String, String> loadingDetails){
        return walletService.addMoneyInWallet(loadingDetails);
    }

    @PostMapping("wallet/recordTransaction")
    public String recordTransaction(@RequestBody Map<String, String> transactionDetails){
        return walletService.recordTransaction(transactionDetails);
    }

    @PostMapping("wallet/showTransactions")
    public List<Transaction> showTransaction(@RequestBody Map<String, String> transactionDetails){
        return walletService.showTransactions(transactionDetails);
    }
}
