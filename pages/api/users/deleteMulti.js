import { prisma } from '@/config/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'DELETE':
      return await deleteMulti(req, res);
  }
}

const deleteMulti = async (req, res) => {
  try {
    const { ids } = req.body;
    await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return res.status(200).json({ success: 'Deleted selected data', ids: ids });
  } catch (error) {
    return res.json(500).json(error.message);
  }
};
