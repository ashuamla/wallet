package com.ashu.wallet.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "wallet")
@TypeAlias("")
public class Wallet {
    @Id
    private String id;
    private String mobileNumber;
    private double balance;
    private String upiId;
}
