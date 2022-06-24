import Order from './modal.js';
import { Res } from '../util.js';
import dotenv from 'dotenv';
//import nodemailer from 'nodemailer';
//import { google } from 'googleapis';
dotenv.config();

//const CLIENT_ID = process.env.client_id;
//const CLIENT_SECRET = process.env.client_sec;
//const REDIRECT_URI = process.env.redirect_url;
//const REFRESH_TOKEN = process.env.refresh_token;

const Controller = { 
  createOne: (req, res) => {
    return Res(res, async () => {     
      const checkOrder = await Order.findOne(req.body)
      if (checkOrder) {
        return res.status(201).send({status: 201, message:'Order already exists'})
      } else {
        const Orders = await Order.create(req.body)
        return res.status(200).send({ status: 200, data: Orders })
      }
      
    })
  },
  fetchOrders: async (req, res) => {
    return Res(res, async () => {
      const Orders = await Order.find(req.body)
      if (Orders =="") {
        return res.status(201).send({status: 201, message: "No orders created already"})
      } else {
         return res.status(200).send({ status: 200, data: Orders })
      }
      
    })
  },
  delete: async (req, res) => {
    return Res(res, async () => {
      const OrderTarget = await Order.findByIdAndRemove(req.params.id)
      if (OrderTarget) {
        return res.status(200).send({ status: 200, message: 'Order deleted successfully' })
      }
      return res.status(404).send({ status: 404, message: 'Order not found' })
    })
  },
  statusUpdate: async (req, res) => {
    return Res(res, async () => {
      const OrderSelector = await Order.findById(req.params.id)
      if (OrderSelector.status == req.body.status) {
        return res.status(201).send({status:'201', message:'Nothing to update'})
      } else{
        const OrderTarget = await Order.findByIdAndUpdate(req.params.id, req.body)
        if (OrderTarget) {
          const data = await Order.findById(req.params.id)         
            res.status(200).send({ status: 200, message: 'Order Status changed successfully', data });       
        }
        return res.status(404).send({ status: 404, message: 'Order not found' })

      }
      
    })
  },
  update: async (req, res) => {
    return Res(res, async () => {
      const OrderTarget = await Order.findByIdAndUpdate(req.params.id, req.body)
      if (OrderTarget) {
        const data = await Order.findById(req.params.id)
        return res.status(200).send({ status: 200, message: 'Order updated successfully', data })
      }
      return res.status(404).send({ status: 404, message: 'Order not found' })
    })
  }
}

export default Controller;