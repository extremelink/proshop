import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {
    const [ paymentMethod, setPaymentMethod ] = useState('PayPal');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector( state => state.cart );
    const { shippingAddress } = cart;

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={ submitHandler }>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        label='PayPal or Credit Card'
                        name='paymentMethod'
                        id='PayPal'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                    </Form.Check>
                </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    Conitnue
                </Button>

        </Form>
    </FormContainer>
  )
}

export default PaymentScreen