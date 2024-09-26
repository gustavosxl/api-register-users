import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())



app.post('/users', async (req, res) => {
    try {
        const email = req.body.email;
        
        const existingEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingEmail) throw new Error("There is a user using this email")

        await prisma.user.create({
            data: {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            }

        })
        res.status(201).json(req.body)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    } finally {
        console.log("finally correct")
    }

})



app.get('/users', async (req, res) => {

    console.log(req)

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.put('/users/:id', async (req, res) => {

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
app.delete('/users/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).send("User deleted successfully")

})




app.listen(3000)