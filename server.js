import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app =  express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000


app.post('/users', async (req,res)=>{

 await prisma.user.create({
    data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    }

})

res.status(201).json(req.body)
})



app.get('/users',async (req,res) =>{

    console.log(req)

    const users = await prisma.user.findMany()

    res.status(200).json(users)
}) 

app.put('/users/:id', async (req,res) =>{

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
           name: req.body.name,
           age: req.body.age, 
           email: req.body.email 
        }

    })

})
app.delete('/users/:id', async (req,res) =>{

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).send("User deleted successfully")

})




app.listen(3000)