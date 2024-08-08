import { nanoid } from 'nanoid';
import URL from"../models/url.js"

async function createShortUrl(req, res){
    try{
        const body = req.body;
        if(!body.url) return res.status(400).json({error: "URL is required!"})
        const nanoID = nanoid(8);
        await URL.create({
            shortId : nanoID,
            redirectUrl : body.url,
            visitHistory : [],
            createdBy: req.user._id
        });
        const allurls = await URL.find({ createdBy : req.user._id })
        return res.render("home",{ id: nanoID, urls: allurls} )
      
    }
    catch (error) {
        res.status(500).json({ error: error.message });
      }
}

async function getUrl(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push : {
            visitHistory :{ 
                timestamp : Date.now()
            } 
        }
    })

    res.redirect(entry.redirectUrl)
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})

    return res.json({
        totalClicks : result.visitHistory.length, 
        analytics: result.visitHistory})
}
export {createShortUrl, getUrl, getAnalytics  }