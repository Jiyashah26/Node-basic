const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const profiles = [
  {
    id: 1,
    link: "Tehseen-student",
    name: "Tehseen",
    desc: "student",
  },
  {
    id: 2,
    link: "Nawaf-student",
    name: "Nawaf",
    desc: "student",
  },
  {
    id: 3,
    link: "moin-student",
    name: "Moin",
    desc: "student",
  },
  {
    id: 4,
    link: "Basheer-student",
    name: "Basheer",
    desc: "student",
  },
];

// / => http://basheer.com -> endpoint / api
app.get("/", (req, res) => {
  res.send("Test 9");
});

app.get("/profiles", (req, res) => {
  res.status(200).json(profiles);
});

app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  const profile = profiles.find((profile) => {
    return profile.id == id;
  });

  res.send(profile ?? "Not found");
});

//create new profile

app.post("/profileCreate/", (req, res) => {
  const profile = req.body;
  profiles.push(profile);
  res.status(200).json(profiles);
});

app.put("/profileEdit/", (req, res) => {

  // Algorithm
  // step1: Save req data in profile variable
  // step2: Find index
  // step3: Check index is there or not
  // step4: Replace the new value
  // step5: Return updated value

  // save req data in profile variable
  const profile = req.body;

  // to find index
  const profileIndex = profiles.findIndex((item) => {
    return item.id == profile.id;
  });

  // check index is there or not
  if(profileIndex == -1){
      res.status(404).send("Not found");
  }

  // replace the new value
  profiles[profileIndex] = profile;

  // return updated value
  res.status(200).send(profiles);
  
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

app.listen("8000", () => {
  console.log("Server is running on port 8000...");
});
