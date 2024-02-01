package com.ashu.wallet.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/")
    public String home(){
        return "/html/index";
    }
    @GetMapping("/index.html")
    public String index(){
        return "/html/index";
    }
    @GetMapping("/account.html")
    public String getAccount(){
        return "/html/account";
    }
    @GetMapping("/loadWallet.html")
    public String loadWallet(){
        return "/html/loadWallet";
    }
    @GetMapping("/sendMoney.html")
    public String sendMoney(){
        return "/html/sendMoney";
    }
    @GetMapping("/transactions.html")
    public String fetchTransactions(){
        return "/html/transactions";
    }
}
