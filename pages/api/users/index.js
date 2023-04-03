import { prisma } from '@/config/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getUsers(req, res);

    case 'POST':
      if (Array.isArray(req.body)) {
        return await addUsers(req, res);
      } else {
        return await addUser(req, res);
      }

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}

const getUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    const {
      uuid,
      beginPosition,
      interpretation,
      sequenceNumber,
      correctionNumber,
      name,
      type,
      lighted,
      group,
      position,
      elevation,
    } = req.body;

    const data = {
      uuid,
      beginPosition,
      interpretation,
      sequenceNumber,
      correctionNumber,
      name,
      type,
      lighted,
      group,
      position,
      elevation,
    };

    const result = await prisma.user.create({
      data,
      select: {
        id: true,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addUsers = async (req, res) => {
  try {
    const userData = req.body;

    const result = await prisma.user.createMany({
      data: userData,
    });

    res.status(201).json({ count: result.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
