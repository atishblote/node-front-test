const axios = require("axios");
const dotenv = require('dotenv')
dotenv.config()
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const BASEURL = process.env.BASEURL;

exports.homePage = async (req, res, next) => {
  try {
    
    // Perform two API calls simultaneously
    const [allListResponse, paidListResponse] = await Promise.all([
        axios.get(`${BASEURL}all-listings?populate=*`, {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }),
        axios.get(
          `${BASEURL}marketings?filters[active][$eq]=true&populate[all_listings][populate][0]=feature`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
            },
          }
        ),
      ]);

    const listings = allListResponse.data.data; // Adjust this based on the API response structure
    const paidListings = paidListResponse.data.data; // Adjust this based on the API response structure
    res.render('home', { listings , paidListings });
    // res.render("home", { message: "" });
  } catch (error) {
    res.status(500).json({
      code: 0,
      message: "Something went wrong in author",
      error: error,
    });
  }
};