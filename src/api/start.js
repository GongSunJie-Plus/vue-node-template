import request from '@/utils/request'
import axios from 'axios'

export const getStart = (data) => 
  request({
    url: '/start',
    method: 'put',
    data
  })

export const test = (params) => {
  axios({
    url: 'https://ssl.hi.163.com/file_mg/public/share/common_auth/corpauth/login',
    method: 'get',
    params
  })
}
