const express = require('express');

const app = express();
app.use(express.json());

var arr=[
    {
      "name": "irfan",
      "email": "afsajj@gmac.com",
      "phone_number": ["3232","32324423"],
      "gender": "male",
      "course_code": "MT323",
      "address": {
        "country": "pakistan",
        "city": "lahore",
        "street_address": "no known"
      },
      "id":"0"
    },
  ];

app.get('/',(req,res)=>{
  res.json({msg:"success",arr})
})

app.post('/',(req,res)=>{
  const {id,name,email,gender,address,course_code,phone_number}=req.body;
    const {street_address,city,country}=address;
  const newFaculty={
    id,
    name,
    email,
    gender,
    address:{
      street_address,
      city,
      country
    },
    course_code,
    phone_number
  }
  if(id){
    arr.push(newFaculty)
    return res.json({
        success: "success",
        arr,
      });
  }else {
    return res.json({
      msg:"provide id feild for record"
    })
  }
})

app.put('/:id',(req,res)=>{
  i = arr.findIndex((obj => obj.id == req.params.id));
  const result=arr[i];

  var merge={...result,...req.body};
  arr[i]=merge;

  res.status(200).json({
    status: 'success',
    arr,
  });
})

app.delete('/:id',(req,res)=>{
  i = arr.findIndex((obj => obj.id == req.params.id));
  arr.splice(i,1);
  res.status(204).json({
    status: 'deleted',
  });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Running at ${PORT}`);
});