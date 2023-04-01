import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function DriverLogin() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  //user login

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("https://tripdbs.vercel.app/auth/driver/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // const data= res.json();
    //console.log(data);

    const data = await res.json();
    console.log(data.message);

    router.push("/driverdash");
  };

  return (
    <div>
      <div className="flex flex-col items-center mt-2">
        <h1 className="m-auto font-semibold text-lg "> Driver Login </h1>{" "}
      </div>{" "}
      {error && <p> {error} </p>}
      <div className="mt-5">
        <form
          onSubmit={handleLogin}
          className=" flex items-center flex-col space-y-3"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="Username"
            className="w-3/4 p-2 m-auto rounded-lg shadow-md outline-none text-sm"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-3/4 p-2 m-auto rounded-lg shadow-md outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-lg text-white shadow-sm font-semibold hover:scale-105 hover:font-bold transition transfrom duration-300 ease-out "
          >
            Login{" "}
          </button>{" "}
        </form>{" "}
        <div className="">
          <h1
            onClick={() => {
              router.push("/engineerauth");
            }}
            className="p-2 text-md text-blue-500 hover:scale-102 transition transfrom duration-300 ease-out curso-pointer "
          >
            Engineer Login{" "}
          </h1>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
