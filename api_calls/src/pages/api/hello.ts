// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         res.status(200).json({ message: "Hello Chinweike"});
//     } catch (error) {
//         console.error("API Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }



// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ message: 'Hello, World!' });
// }



// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   res.status(200).json(data);
// }




// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   res.status(200).json({ userId: id });
// }


import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email } = req.body;
    res.status(200).json({ name, email });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}