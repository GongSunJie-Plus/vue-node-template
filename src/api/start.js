import request from '@/utils/request'

export const getStart = (params) => 
  request({
    url: '/start',
    method: 'get',
    params
  })
