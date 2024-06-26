import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import { sendOrder } from "../http/ordersAPI";
import { SHOP_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const Ordering = () => {
    const { basket, user } = useContext(Context);
    const [phone, setPhone] = useState(null);
    const navigate = useNavigate();

    const buy = () => {
        let order = {
            mobile: phone,
            basket: basket.Basket
        };

        if (user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            console.log(data);
            basket.setDeleteAllDeviceFromBasket();
            navigate(SHOP_ROUTE); // использование useNavigate для навигации
        });
    };

    return (
        <>
            <Form>
                <Form.Control
                    placeholder="Input your phone..."
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Form>
            <Row className="mt-3">
                <Col xs={12}>
                    <Button variant="secondary" onClick={buy}>Buy</Button>
                </Col>
            </Row>
        </>
    );
};

export default Ordering;
