const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded());
app.use(express.static("assets"));

// static db
var contactList = [
  {
    name: "Arpan",
    phone: "1111111111",
  },
  {
    name: "Tony Stark",
    phone: "1234567890",
  },
  {
    name: "Coding Ninjas",
    phone: "12131321321",
  },
];

app.get("/practice", function (req, res) {
  return res.render("practice.ejs", {
    title: "Let us play with ejs",
  });
});

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render("home.ejs", {
      title: "Contacts List",
      contact_list: contacts,
    });
  });
});

app.post("/create-contact", function (req, res) {
  // contactList.push(req.body);
  // return res.redirect("/");

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("Error in creating a contact");
        return;
      }
      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error : ", err);
    return;
  }
  console.log("Server is up and running on port: ", port);
});

app.get("/delete-contact", function (req, res) {
  // console.log(req.query);

  //get the id from query in the url
  let id = req.query.id;

  // find the contact in the database using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting an object from database");
      return;
    }
    return res.redirect("back");
  });
});
