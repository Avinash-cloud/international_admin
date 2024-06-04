import { Limeted } from "@/models/limited";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Limeted.findOne({_id:req.query.id}));
    } else {
      res.json(await Limeted.find().sort({ _id: -1 }).limit(2));
    }
  }

  if (method === 'POST') {
    const {title,description,price,images,category,properties} = req.body;
    const productDoc = await Limeted.create({
      title,description,price,images,category,properties
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,description,price,images,_id} = req.body;
    console.log( req.body)
    await Limeted.updateOne({_id}, {title,description,price,images});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Limeted.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}