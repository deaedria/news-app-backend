import http from "k6/http";
import { check, sleep } from "k6";

const Load = [
    { target: 200, duration: '2m' },
    { target: 200, duration: '5m' },
    { target: 0, duration: '2m' }
]
const Stress = [
    { target: 100, duration: "1m" },
    { target: 100, duration: "1m" },
    { target: 200, duration: "1m" },
    { target: 200, duration: "1m" },
    { target: 0, duration: "5m" },
]
const Spike = [
    { target: 40, duration: "1m15s" },
    { target: 40, duration: "1m15s" },
    { target: 200, duration: "1m55s" },
    { target: 0, duration: "1m15s" },
]
const Soak = [
    { target: 200, duration: "1m" },
    { target: 200, duration: "9m" },
    { target: 0, duration: "1m" },
]

export let options = {
    stages: Load,
}


export default function () {
    let response;

    // /news/api/login
    response = http.post(
        "http://localhost:5000/news/api/auth/login",
        '{"email":"joe@gmail.com","password":"12345"}',
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );

    // /news/api/register
    response = http.post(
        "http://localhost:5000/news/api/auth/register",
        '{"email":"lia@gmail.com","password":"88888","phone_number":"085554567777"}',
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );

    // news/api/users/
    response = http.get("http://localhost:5000/news/api/users");

    // /news/api/users/:id
    response = http.get("http://localhost:5000/news/api/users/3");

    // /news/api/users/:id
    // response = http.patch(
    //     "http://localhost:5000/news/api/users/3",
    //     '{"name":"Joe Daniel"}',
    //     {
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //     }
    // );

    // /news/api/users/:id
    response = http.del("http://localhost:5000/news/api/users/75");

    // Automatically added sleep
    sleep(1);
}