import Order from './modal.js';
import { Res } from '../util.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
dotenv.config();

const CLIENT_ID = process.env.client_id;
const CLIENT_SECRET = process.env.client_sec;
const REDIRECT_URI = process.env.redirect_url;
const REFRESH_TOKEN = process.env.refresh_token;

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
          const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
          oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
          async function sendMail() {
              try {
                  const accessToken = await oAuth2Client.getAccessToken()

                  const transport = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                          type: 'OAuth2',
                          user: 'jamirafghanistan@gmail.com',
                          clientId: CLIENT_ID,
                          refreshToken: REFRESH_TOKEN,
                          clientSecret: CLIENT_SECRET,
                          accessToken: accessToken
                      }
                  });

                          const mailOptions = {
                              from: 'AirDady Shopwize API <jamirafghanistan@gmail.com>',
                              to: OrderSelector.userId,
                              subject: 'YOUR ORDER STATUS CHANGED',
                            html: `<h3> Hello ${OrderSelector.userId} </h3>
                               <p>We're glad to inform you that Your Order Status has changed to <b> ${req.body.status} </b>
                               for order number <b> ${req.params.id} </b>
                               </p>`
                          };
                        
                  const result = await transport.sendMail(mailOptions)
                  return result;
                  
              } catch (error) {
                  return error
              }
          }
          sendMail().then(result => console.log('Email Sent ...', result)).catch(error=>console.log(error.message))
          
          
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