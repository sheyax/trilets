import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const getData = async () => {
    const res = await axios.get("https://tripdbs.vercel.app/auth/user");

    setData(res.data);
  };

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("https://tripdbs.vercel.app/auth/login", {
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
    ///cookies.set('jwt', res.data.tokener, { expires: new Date(60*1000)});
    router.push("/feedpage");
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div>
      <h1>Hello {data}</h1>
      <form onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit" className=" bg-blue-600 text-white p-2">
          {" "}
          Login{" "}
        </button>
      </form>

      <button onClick={getData} className=" bg-blue-600 text-white p-2">
        {" "}
        Get Data
      </button>
    </div>
  );
}
