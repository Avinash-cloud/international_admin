import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const {title,description,price,images,category,properties,stock} = req.body;
    const productDoc = await Product.create({
      title,description,price,images,category,properties,stock
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,stock,description,price,images,category,properties,_id} = req.body;
    console.log( req.body)
    await Product.updateOne({_id}, {title,stock,description,price,images,category,properties});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}