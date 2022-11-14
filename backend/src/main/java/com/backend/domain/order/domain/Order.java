package com.backend.domain.order.domain;

import com.backend.domain.order.dto.OrderPostDto;
import com.backend.domain.user.domain.User;
import com.backend.global.audit.Auditable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private String zipCode;

    private String orderAddress;


    private String receiverName;

    private String receiverPhone;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Builder
    public Order(Long orderId, String zipCode, String orderAddress, String orderAddressDetail,
                 String receiverName, String receiverPhone,User user, OrderStatus orderStatus){
        this.orderId = orderId;
        this.zipCode = zipCode;
        this.orderAddress = orderAddress;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        this.user = user;
        this.orderStatus = orderStatus;
        //매퍼를 사용하면 디티오와 엔티티가 서로 연관된 필드가있지만 필요없는 필드도 있는데 그걸 전부 변환해준다.. 하지만 빌더를 사용하면 원하는 필더만
        //생성자로 가져올수 있다? 이게 맞나? 백엔드분들에게 빌프패턴 검사받기
    }

    public static Order createOrder(OrderPostDto orderPostDto, User user) {
        Order order = Order.builder()
                .user(user)
                .orderAddress(orderPostDto.getReceiverAddress())
                .receiverName(orderPostDto.getReceiverName())
                .receiverPhone(orderPostDto.getReceiverPhone())
                .build();

        return order;



    }

    // todo : orderStatus 에 따라 주문 상태 변경 가능 유무

}
