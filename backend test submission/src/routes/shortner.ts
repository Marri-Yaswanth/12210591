import express from 'express'
import {createShortURL , getAnalytics , handleRedirect} from '../service/shorenerService'

const router = express.Router()

router.post('/shorturls' , async(req,res)=>{
    try{
        const {url , validity , shortcode} = req.body
        const result = await createShortURL(url , validity , shortcode)
        res.status(201).json(result)
    }
    catch(err){
        const error = err as Error
        res.status(400).json({error: error.message})
    }
})

router.get('/shorturls/:code' , async(req,res)=>{
    try{
        const result = await getAnalytics(req.params.code)
        res.json(result)
    }
    catch(err){
        const error = err as Error
        res.status(404).json({error: error.message})
    }
})

router.get('/:code' , async(req,res)=>{
    try{
        const result = await handleRedirect(req.params.code , req)
        res.redirect(result)
    }
    catch(err){
        const error = err as Error
        res.status(404).json({error: error.message})
    }
})

export default router