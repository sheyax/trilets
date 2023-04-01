import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DriverCard from "./Components/DriverCard";
import TripCard from "./Components/TripCard";
import Header from "./Components/Header";
import FooterMenu from "./Components/FooterMenu";

export default function FeedPage() {
  const [data, setData] = useState("");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [trips, setTrips] = useState([]);
  const [userRole, setUserRole] = useState("");
  const router = useRouter();

  //----------------------- get user -------------------------//

  const getData = async () => {
    try {
      const res = await fetch("https://tripdbs.vercel.app/auth/driver/user", {
        credentials: "include",
      });

      //setData(await res.data);
      const info = await res.json();
      setUsername(info.username);
      setVehicleNumber(info.assignedVehicle);
      setTrips(info.dailyTrips);
      setUserRole(info.roles);

      console.log(vehicleNumber, trips);
    } catch (e) {
      console.log("Error getting user", e);
      router.push("/driverlogin");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //-----------------Logout-----------------------------//
  const logout = async () => {
    try {
      const res = await fetch("https://tripdbs.vercel.app/auth/driver/logout", {
        method: "POST",
        headers: { "Content-Type": "application/" },
        credentials: "include",
      });

      console.log(res.data);
      router.push("/driverlogin");
    } catch (err) {}
  };

  //------------------ trip calculation -------------------------------//
  let totalTrip = 0;
  let totalWorkHours = 0;
  let totalOverTime = 0;
  // Total Trip Function
  trips.forEach((data) => {
    if (!data.aprroved) return;
    totalTrip += data.endOdometer - data.startOdometer;

    // working hours
    let startingTime = new Date(`${data.date}T${data.startTime}`).getTime();
    let endingTime = new Date(`${data.date}T${data.endTime}`).getTime();
    let workingHours = (endingTime - startingTime) / 60000 / 60;
    totalWorkHours += workingHours;

    //OverTime
    if (data.endTime >= "18:00" && data.endTime < "7:00") {
      totalOverTime += workingHours;
    }

    //add outstation
  });

  //----------------frontend--------------------------//
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <Header />
      <div>
        {/* logout */}
        <p className="text-sm text-red-500 p-2" onClick={logout}>
          Logout
        </p>
      </div>
      <DriverCard name={username} vehicle={vehicleNumber} />

      <div className="flex justify-between items-center mx-5">
        <h1 className="text-xl p-2  font-bold text-gray-700">Trips</h1>

        <p className="text-gray-600">Total Milage: {totalTrip} Km</p>
      </div>
      {trips?.map((trip) => (
        <div key={trip._id}>
          <TripCard
            key={trip.startTime}
            date={trip.date}
            startOdo={trip.startOdometer}
            endOdo={trip.endOdometer}
            startTime={trip.startTime}
            endTime={trip.endTime}
            startLoc={trip.startLocation}
            endLoc={trip.endLocation}
            approved={trip.aprroved}
          />
        </div>
      ))}

      <FooterMenu />
    </div>
  );
}
