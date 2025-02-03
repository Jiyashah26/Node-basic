const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/Basic"; // Replace with your MongoDB URI
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB")) //(then sucess ke liye use krte hai)
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a Mongoose schema and model
const profileSchema = new mongoose.Schema({
  id: Number,
  link: String,
  name: String,
  desc: String,
});

const Profile = mongoose.model("Profile", profileSchema);

const data = [
  {
    id: "1",
    name: "Tehseen",
    address: {
      city: "Mumbra",
      state: "Maha",
    },
    images: ["img1", "img2"],

    imagesWithKey: [
      {
        path: "/images",
        name: "img1",
      },
      {
        path: "/images",
        name: "img2",
      },
    ],
  },
  {
    id: "2",
    name: "Rumana",
    address: {
      city: "kausa",
      state: "Maha",
    },
    images: ["img1", "img2"],

    imagesWithKey: [
      {
        path: "/images",
        name: "img2",
      },
      {
        path: "/images",
        name: "img1",
      },
    ],
  },
  {
    id: "3",
    name: "moin",
    address: {
      city: "Mumbra",
      state: "Maha",
    },
    images: ["img1", "img2"],

    imagesWithKey: [
      {
        path: "/images",
        name: "img3",
      },
      {
        path: "/images",
        name: "img4",
      },
    ],
  },
];

// const profiles = [
//   {
//     id: 1,
//     link: "Tehseen-student",
//     name: "Tehseen",
//     desc: "student",
//   },
//   {
//     id: 2,
//     link: "Nawaf-student",
//     name: "Nawaf",
//     desc: "student",
//   },
//   {
//     id: 3,
//     link: "moin-student",
//     name: "Moin",
//     desc: "student",
//   },
//   {
//     id: 4,
//     link: "Basheer-student",
//     name: "Basheer",
//     desc: "student",
//   },
// ];

// / => http://basheer.com -> endpoint / api
app.get("/", (req, res) => {
  res.send("Test 9");
});

app.get("/home", (req, res) => {
  const result = data.filter((item) => {
    const naam = item.imagesWithKey.findIndex((obj) => {
      return obj.name == "img1";
    });
    if (naam == -1) {
      return false;
    } else {
      return true;
    }
  });

  res.send(result);
});

app.get("/profiles", async (req, res) => {
  const profiles = await Profile.find(); // Fetch all profiles from MongoDB
  res.status(200).send(profiles.length !== 0 ? profiles: []);
  console.log(profiles);
});

app.get("/profile/:id", async (req, res) => {
  const newId = req.params.id;
  const profile = await Profile.findOne({ id: newId });
  // const profile = profiles.find((profile) => {
  //   return profile.id == id;
  // });

  res.send(profile ?? "Not found");
});

//create new profile

app.post("/profileCreate/", async (req, res) => {
  const profile = req.body;
  const newProfile = new Profile(profile);
  await newProfile.save();
  const profiles = await Profile.find();
  res.status(200).json(profiles);  //(json.pars )
});

app.put("/profileEdit/", async (req, res) => {
  const profile = req.body;
  const result = await Profile.updateOne({ id: profile.id }, { $set: profile }); //(updateOne ka parameter set krtahai $dollar ka sign)
  if (result.matchedcount === 0) res.status(404).send("Not found"); 

  const profiles = await Profile.find();
  res.status(200).json(profiles);

  // Algorithm
  // step1: Save req data in profile variable
  // step2: Find index
  // step3: Check index is there or not
  // step4: Replace the new value
  // step5: Return updated value

  // save req data in profile variable

  // to find index
  // const profileIndex = profiles.findIndex((item) => {
  //   return item.id == profile.id;
  // });

  // check index is there or not
  // if (profileIndex == -1) {
  //   res.status(404).send("Not found");
  // }

  // replace the new value
  // profiles[profileIndex] = profile;

  // return updated value
  // res.status(200).send(profiles);

  //   const profile = req.body;
  //   const newProfiles = profiles.map((item) => {
  //     if(item.id == profile.id){
  //         return { ...profile };
  //     }else{
  //         return { ...item };
  //     }
  //   });
  //   res.status(200).send(newProfiles);
});

//Delete profile

app.delete("/profiledelete/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    // Find and delete the document by ID
    const deleteProfile = await Profile.findOneAndDelete({ id:id});
    if (!deleteProfile) {
      return res.status(404).send("Profile not found");
    }

    const profiles = await Profile.find();
    return res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// app.delete("/profiledelete.id/", (req, res) => {
//   const id = req.params.id;
//   const profileIndex = profiles.findIndex(() => {
//     return id == id;
//   });

//   if (profileIndex == -1) {
//     res.status(404).send("Not found");
//   }

//   profiles.splice(profileIndex, 1);
//   res.status(200).send(profiles);
// });

app.listen("8000", () => {
  console.log("Server is running on port 8000...");
});
