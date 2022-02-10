import axios from 'axios';
import baseUrl from './baseUrl';

export function getRates(params) {
  return axios({
    method: 'post',
    url: `${baseUrl}/v1/buy/rates`,
    headers: {
      Authorization: params.authorization,
    },
    data: params,
  });
}

export function buyCurrency(params) {
  return axios({
    method: 'post',
    url: `${baseUrl}/v1/buy`,
    headers: {
      Authorization: params.authorization,
    },
    data: {
      cust_order_id: params.cust_order_id,
      from_currency: params.from_currency,
      amount: params.amount,
      to_crypto: params.to_crypto,
      channel_name: params.channel_name,
      address: params.address,
      return_url: params.return_url,
      domain: 'https://www.inst.money/',
    },
  });
}

export function sendEmail(params) {
  return axios({
    method: 'post',
    url: `${baseUrl}/v1/email`,
    data: params,
  });
}
