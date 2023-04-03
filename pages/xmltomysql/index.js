import fs from 'fs';
import util from 'util';
import xml2js from 'xml2js';
import mysql from 'mysql';

const readFile = util.promisify(fs.readFile);
const parser = new xml2js.Parser({ explicitArray: false });

async function readXmlAndSaveToDb() {
  const xmlData = await readFile('COCESNA_20170516_sample_hevi.xml');
  const result = await parser.parseStringPromise(xmlData);
  const jsonData = JSON.stringify(result);

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'haritaevi',
  });

  connection.connect();

  // console.log(JSON.stringify(result, null, 2)); // output the parsed JSON for debugging

  if (result) {
    const data = result;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      const sql = `INSERT INTO vertical_structure (id, uuid, beginPosition, interpretation, sequenceNumber, correctionNumber, name, type, lighted, _group, position, elevation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        item.id,
        item.uuid,
        item.beginPosition,
        item.interpretation,
        item.sequenceNumber,
        item.correctionNumber,
        item.name,
        item.type,
        item.lighted,
        item._group,
        item.position,
        item.elevation,
      ];

      await new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
          if (err) reject(err);
          console.log('Data inserted successfully');
          resolve();
        });
      });
    }
  } else {
    console.error('Invalid XML file format. Could not find required elements.');
  }

  connection.end();
}

export async function getServerSideProps() {
  try {
    await readXmlAndSaveToDb();
    return { props: {} };
  } catch (error) {
    console.error(error);
    return {
      props: { error: 'An error occurred while saving data to database.' },
    };
  }
}

export default function Home() {
  return <div>Reading and saving data from XML file to database...</div>;
}
