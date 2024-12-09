const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Naudojama tikro tinklalapio URL su meteorologiniais duomenimis
const URL = 'https://www.meteo.lt/lt/miestas?placeCode=Vilnius';

app.use(cors());

app.get('/weather', async (req, res) => {
    try {
        // Atsisiunčiame HTML iš tinklalapio
        const response = await axios.get(URL);
     

        // Tikriname atsisiųstą HTML
        const html = response.data;
      

        // Naudojame cheerio, kad galėtume skaityti HTML
        const $ = cheerio.load(html);

        // Pasirinkite tinkamus selektorius pagal tinklalapio struktūrą
        const temperature = $('.today-temperature').text().trim(); // Temperatūra
        const condition = $('.today-forecast').text().trim(); // Oro sąlygos

        // Debuggingas (patikriname, ar gauname reikšmes)
        console.log('Temperatūra:', temperature);
        console.log('Būklė:', condition);

        // Grąžiname JSON atsakymą klientui
        res.json({
            temperature: temperature || 'Nepavyko gauti temperatūros',
            condition: condition || 'Nepavyko gauti oro būklės'
        });
    } catch (error) {
        console.error('Klaida gaunant duomenis:', error.message);
        res.status(500).json({
            error: 'Nepavyko gauti meteorologinių duomenų'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Serveris veikia adresu http://localhost:${PORT}`);
});
