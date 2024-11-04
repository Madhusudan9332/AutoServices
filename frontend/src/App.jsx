import "./App.css";
// src/App.js
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [showFullArticle, setShowFullArticle] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Mock content for demonstration
  const news = {
    image:
      "https://www.bizzbuzz.news/h-upload/2022/05/19/1534780-air-quality.webp",
    heading:
      "Driving Change: Innovative Solutions to Reduce Car Pollution and Renew Our Future",
    shortArticle: "Car pollution remains a significant contributor to environ...",
    fullArticle: `Car pollution remains a significant contributor to environmental damage, accounting for a large share of greenhouse gas emissions and urban air pollution. The impact on human health and global warming makes it crucial to tackle this pressing issue. Fortunately, innovative solutions are emerging, offering hope for a cleaner, greener future.

Electric vehicles (EVs) are leading the way in reducing car pollution. With zero tailpipe emissions, EVs help improve air quality and decrease our carbon footprint. Governments and automakers are investing heavily in this shift, incentivizing drivers with subsidies and expanding charging infrastructure.

In addition to EVs, car manufacturers are exploring hydrogen fuel cells and hybrid technologies. Cities are also implementing smart traffic management and encouraging the use of public transport, biking, and carpooling to cut down on vehicle congestion.

Together, these advancements are paving the way for a healthier environment, proving that with the right technologies and policies, we can renew our commitment to a sustainable planet.`,
  };

  // Function to handle 'View More' click
  const handleViewMore = () => {
    setShowFullArticle(true);

    // Get geolocation and send to backend
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(latitude, longitude);

          // Send data to backend
          axios
            .post("http://localhost:5000/save-location", {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            .then((response) => {
              console.log("Location saved:", response.data);
            })
            .catch((error) => {
              console.error("Error saving location:", error);
            });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(()=>{
    handleViewMore();
  },[])

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <img
        src={news.image}
        alt="News"
        style={{ width: "100%", height: "auto" }}
      />
      <h1>{news.heading}</h1>
      <p>{showFullArticle ? news.fullArticle : news.shortArticle}</p>
      {!showFullArticle && <button onClick={handleViewMore}>View More</button>}
    </div>
  );
}

export default App;
