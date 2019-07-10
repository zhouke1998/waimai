import axios from 'axios'

export default function ajax(url = "", data = {}, type = 'get', image = false) {
     return new Promise(
         (resolve,reject)=>{
             let promise
             if(type.toLowerCase()==='get'){
                //拼接字符串
                 let str = ""
                 for(let key in  data){
                     str+=`${key}=${data[key]}&`
                 }
                 if(str!==''){
                    str = str.substr(0,str.length-1)
                     url+= "?"+str
                 }
                 promise = axios.get(url)
             }else{
               if (image) {
                 promise = axios.post(url, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
               } else {
                 promise = axios.post(url,data)
               }
             }

             promise.then(response => {
               resolve(response.data)
             }).catch(error => {
                 reject(error)
             })
         }
     )
 }
