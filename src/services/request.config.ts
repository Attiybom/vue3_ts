let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://152.136.185.210:5000' //服务器有问题
  // BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = 'http://152.136.185.210:4000'
}

export const TIME_OUT = 10000
export { BASE_URL }
