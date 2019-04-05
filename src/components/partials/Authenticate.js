import axios from 'axios';
import { toast } from 'react-toastify';
var ls = require('localStorage')
var jwt = require('jsonwebtoken');
var moment = require('moment');

const instance = axios.create({
    baseURL: 'http://192.168.0.18:8080/',
    // baseURL: `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/`,
    headers: {
        'Content-type': 'application/json',
    }
});

function verifyToken(token) {
    var decodedJWT = jwt.decode(token, {complete: true})
    var currentTime = moment().unix()
    if (decodedJWT.payload.exp >= currentTime) {
        ls.setItem("token", token)
        document.location.href='/dashboard'
    } else {
        ls.setItem("token", "")
        document.location.href='/dashboard'
    }
};

const auth = {
    authenticate(loginInfo) {
        instance.get("token", {
            auth: {
                username: loginInfo.email,
                password: loginInfo.password
            }
        })
        .then((response) => {
            if(response.status === 403 || response.status === 401) {
                console.log("not authenticated")
            } else{
                if (response.data !== undefined || response.data !== null || response.data !== ""){
                    verifyToken(response.data) 
                } else {
                    document.location.href='/login'
                }
            }
        })
        .catch(error=>{
            toast("Please enter the correct login information.", {
                hideProgressBar: true,
                position: "top-center",
                closeButton: false,
                type: "info",
                autoClose: 2000,
            })
        })
    },
    verifyToken(token) {
        var decodedJWT = jwt.decode(token, {complete: true})
        var currentTime = moment().unix()
        if (decodedJWT.payload.exp >= currentTime) {
            ls.setItem("token", token)
            document.location.href='/dashboard'
        } else {
            ls.setItem("token", "")
            document.location.href='/login'
        }
    },
    register(registerInfo) {
        instance.post("register", registerInfo)
        .then((response) => {
            if (response.status === 200) {
                document.location.href="/login"
            } else {
                console.log("can't be done")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    },
    logout() {
        ls.removeItem("token")
        ls.setItem("isAuthenticated", "false")
        document.location.href='/login'
    },
    check() {
        if (ls.getItem("token") === undefined || ls.getItem("token") === null){
            return false
        }
        var decodedJWT = jwt.decode(ls.getItem("token"), {complete: true})
        var currentTime = moment().unix()
        if (decodedJWT.payload.exp >= currentTime) {
            return true
        }
        return false
    },
    connection: instance,
}

export default auth
