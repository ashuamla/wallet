package com.ashu.wallet.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "wallet")
public class Wallet {
    @Id
    private String id;
    private String userId;
    private String mobileNumber;
    private String balance;
    private String upiId;
}
