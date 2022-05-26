const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");
const pug = require('pug')

app.set('view engine', 'pug')

const languages = [
  { lingue: "English", id: 1 },
  { lingue: "Russian", id: 2 },
  { lingue: "Uzbek", id: 3 },
];
//GET
app.get("/index", (req, res) => {
  const allLanguages = languages;
  res.render('index.pug')
})
app.get("/home", (req, res) => {
  const allLanguages = languages;
  res.render('home.pug')
})
app.get("/contact", (req, res) => {
  const allLanguages = languages;
  res.render('contact.pug')
})
app.get("/about", (req, res) => {
  const allLanguages = languages;
  res.render('about.pug')
})
//GET with id
app.get("/languages/:id", (req, res) => {
  const allLanguages = languages;
  const lingueId = +req.params.id;
  const lingue = allLanguages.find((lingue) => lingue.id === lingueId);
  res.status(200).send(lingue);
});
//POST
app.post("/languages/add", (req, res) => {
  const allLanguages = languages;

  let newLingue = {
    lingue: req.body.lingue,
    id: allLanguages.length + 1,
  };

  const lingueSchema = Joi.object({
    lingue: Joi.string().min(3).max(15).required(),
  });
  const result = lingueSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }

  allLanguages.push(newLingue);
  res.status(201).send(newLingue);
});
//PUT
app.put("/languages/edite/:id", (req, res) => {
  const allLanguages = languages;
  const idx = allLanguages.findIndex((lingue) => lingue.id === +req.params.id);
  let editedLingue = {
    lingue: req.body.lingue,
  };
  const lingueSchema = Joi.object({
    lingue: Joi.string().min(3).max(15).required(),
  });
  const result = lingueSchema.validate(req.body);
  if (!!result.error) {
    res.status(406).send(result.error.message);
    return;
  }

  allLanguages[idx] = editedLingue;
  res.status(200).send(allLanguages);
});
//DELETE
app.delete("/languages/delete/:id", (req, res) => {
  const idx = languages.findIndex((lingue) => lingue.id === +req.params.id);
  const lingue = languages.splice(idx, 1);
  res.status(200).send(languages);
});

try {
  const port = normalizePort(process.env.port || 3001);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
}

function normalizePort(val) {
  let port = parseInt(val);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}