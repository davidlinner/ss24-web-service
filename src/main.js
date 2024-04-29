import app from './app.js'

export const port = 3001

app.listen(port, ()=>{
    console.log(`Works! Here is the link: http://localhost:${port}`)
})

